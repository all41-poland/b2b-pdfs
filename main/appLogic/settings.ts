import { ipcMain } from "electron";
import { DOCUMENTS_PATH, saveFile, selectFile } from "./files";
import { join } from "path";
import { existsSync, readFileSync } from "fs";
import { getLastDayInMonth } from '../helpers/getLastDayInMonth';

const SETTINGS_FILE_NAME = 'b2bdata.json';
const SETTINGS_FILE_PATH = join(DOCUMENTS_PATH, SETTINGS_FILE_NAME);

const generateEmptyFile = () => {
  const today = new Date();
  const day = today.getDay() > 9 ? today.getDay().toString() : `0${today.getDay()}`;
  const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
  const lastDay = getLastDayInMonth(today);
  const year = today.getFullYear();
  const emptyFile = {
    place: "Poznań",
    client: {
      shortName: "<Nazwa firmy klienta>",
      fullName: "<Nazwa firmy klienta> Sp z o.o.",
      address: "<adres firmy klienta>",
      zipCodeAndPostOffice: "<kod pocztowy i miejscowość klienta>",
      nip: ""
    },
    supervisor: {
      name: "<Imię i nazwisko przełożonego>",
      phone: "",
      email: ""
    },
    myCompany: {
      name: "<nazwa firmy>",
      address: "<adres firmy>",
      zipCodeAndPostOffice: "<kod pocztowy i miejscowość>",
      nip: ""
    },
    productName: "<Nazwa usługi / zakresu prac>",
    myName: "<Twoje imie i nazwisko>",
    orderNumber: `${month}/${year}`,
    orderDate: `01.${month}.${year}`,
    invoiceDate: `${lastDay}.${month}.${year}`,
    realizationDate: `${lastDay}.${month}.${year}`,
    spentHours: 0,
    hourlyRate: -1
  }
  return emptyFile;
}

const createFile = async () => {
  const emptyFile = generateEmptyFile();
  saveFile(
    JSON.stringify(emptyFile, null, 2),
    SETTINGS_FILE_NAME,
  )
}

export interface ReadSettingsEventHandler {
  channel: 'settings:read:default';
  payload: undefined;
  returnType: Promise<{
    status: "FILE_NOT_FOUND",
    message: string,
  } | {
    status: "OK",
    content: ReturnType<typeof generateEmptyFile>,
  }>
}

ipcMain.handle(
  'settings:read:default' as ReadSettingsEventHandler['channel'],
  async () => {
    const filePath = SETTINGS_FILE_PATH;

    if (!existsSync(filePath)) {
      await createFile();
      return {
        status: "FILE_NOT_FOUND",
        message: "Plik nie został znaleziony. Utworzono nowy plik."
      }
    } else {
      const fileContent = readFileSync(filePath, 'utf8');
      const parsedContent = JSON.parse(fileContent);
      return {
        status: "OK",
        content: parsedContent,
      }
    }
  })

ipcMain.handle(
  'settings:read:custom' as ReadSettingsEventHandler['channel'],
  async () => {
    const res = await selectFile();
    const filePath = res.filePaths[0];

    if (!existsSync(filePath)) {
      await createFile();
      return {
        status: "FILE_NOT_FOUND",
        message: "Plik nie został znaleziony. Utworzono nowy plik."
      }
    } else {
      const fileContent = readFileSync(filePath, 'utf8');
      const parsedContent = JSON.parse(fileContent);
      return {
        status: "OK",
        content: parsedContent,
      }
    }
  })