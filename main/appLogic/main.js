import fs from 'fs';
import { ipcMain } from 'electron'

const isProd = process.env.NODE_ENV === 'production';
const portableDir = process.env.PORTABLE_EXECUTABLE_DIR;
const fileName = 'b2bdata.json';
const filePath = isProd ? `${portableDir}/${fileName}` : `./${fileName}`; // TODO Use path.sep

const getLastDayInMonth = (today) => {
  const month = today.getMonth();
  if (month === 1
    || month === 3
    || month === 5
    || month === 7
    || month === 8
    || month === 10
    || month === 12
  ) {
    return 31;
  } else if (month === 4
    || month === 6
    || month === 9
    || month === 11
  ) {
    return 30;
  } else if (month === 2) {
    if (today.getFullYear() % 4 === 0) {
      return 29;
    } else {
      return 28;
    }
  }
}

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
      NIP: ""
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

const createFile = () => {
  const emptyFile = generateEmptyFile();
  fs.writeFileSync(filePath, JSON.stringify(emptyFile, null, 2));
}

ipcMain.on('readFile', async (event, arg) => {
  if (!fs.existsSync(filePath)) {
    createFile();
    event.reply('readFile', {
      status: "FILE_NOT_FOUND",
      message: "Plik nie został znaleziony. Utworzono nowy plik."
    })
  } else {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedContent = JSON.parse(fileContent);
    event.reply('readFile', {
      status: "OK",
      content: parsedContent,
    })
  }
})