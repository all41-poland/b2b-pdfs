import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { JsonResponse } from '../src/appInterfaces';
import Loader from '../src/ui/Loader/Loader';
import Button from '../src/ui/Button';
import { pdf } from '@react-pdf/renderer';
import ProtocolPdfGenerator from '../src/ProtocolPdfGenerator/ProtocolPdfGenerator';
import OrderPdfGenerator from '../src/OrderPdfGenerator/OrderPdfGenerator';
import Input from '../src/ui/Input';
import { ReadSettingsEventResult } from '../../main/appLogic/settings';
import Background from './ui/Background/Background';
import { Center } from '@mantine/core';
import InteractiveBackground from './ui/InteractiveBackground/InteractiveBackground';

const APPLICATION_NOT_LOADED = "Dane nie zostały jeszcze przygotowane...";
const FILE_NOT_FOUND_TEXT = `Plik bazy danych "b2bdata.json" nie został znaleziony. 
  Musi się on znajdować w folderze "Documents/b2b-pdfs/" albo w miejscu gdzie znajduje się plik exe.
  Stwórz nowy plik i następnie go uzupełnij lub otwórz juz istniejący plik.
  `;
const FILE_NOT_FILLED_CORRECTLY = `Dane w pliku b2bdata.json nie zostały wypełnione poprawnie! 
Plik znajduje się w folderze "Documents/b2b-pdfs/" albo w miejscu gdzie zlokalizowany jest plik exe.`;

export default function App() {
  const [b2bData, setB2bData] = useState<JsonResponse>();
  const [orderNumber, setOrderNumber] = useState<string>();
  const [orderDate, setOrderDate] = useState<string>();
  const [invoiceDate, setInvoiceDate] = useState<string>();
  const [realizationDate, setRealizationDate] = useState<string>();
  const [spentHours, setSpentHours] = useState<number>();
  const [doesB2bDataJsonExist, setDoesB2bDataJsonExist] = useState<boolean>();

  const readSettings = async (res: ReadSettingsEventResult) => {
    if (res.status === "FILE_NOT_FOUND") {
      setDoesB2bDataJsonExist(false);
      return;
    }

    if (res.status === 'OK') {
      setDoesB2bDataJsonExist(true);
      setB2bData(res.content);
      setOrderNumber(res.content.orderNumber);
      setOrderDate(res.content.orderDate);
      setInvoiceDate(res.content.invoiceDate);
      setRealizationDate(res.content.realizationDate);
      setSpentHours(res.content.spentHours);
    }
  }

  const readSettingsFromDefaultJsonFile = async () => {
    const res = await window.ipc.invoke('settings:read:default');
    await readSettings(res);
  }

  const readSettingsFromCustomJsonFile = async () => {
    const res = await window.ipc.invoke('settings:read:custom');
    await readSettings(res);
  }

  const readSettingsAndCreateTemplate = async () => {
    const res = await window.ipc.invoke('settings:readandcreate');
    await readSettings(res);
    if (res.status === "FILE_NOT_FOUND") {
      readSettingsFromDefaultJsonFile();
    }
  }

  useEffect(() => {
    readSettingsFromDefaultJsonFile();
  }, []);

  const generatePdfDocuments = async () => {
    if (!b2bData || !orderDate || !orderNumber || !realizationDate || !invoiceDate || !spentHours) {
      return null;
    }
    const escapedOrderNumber = orderNumber.replace(/\//g, '_');
    const protocolFileName = `Protokół odbioru prac ${escapedOrderNumber}.pdf`;
    const orderFileName = `Zamówienie usług ${escapedOrderNumber}.pdf`;

    const blob1 = await pdf((
      <OrderPdfGenerator
        productName={b2bData.productName}
        orderNumber={orderNumber}
        supervisor={b2bData.supervisor}
        place={b2bData.place}
        myName={b2bData.myName}
        myCompany={b2bData.myCompany}
        realizationDate={realizationDate}
        orderDate={orderDate}
        spentHours={spentHours}
        hourlyRate={b2bData.hourlyRate}
        clientCompany={b2bData.client}
      />
    )).toBlob();
    const res = await window.ipc.invoke('saveFile', { data: await blob1.arrayBuffer(), fileName: orderFileName });

    if (res.status === "CANCELLED") {
      return;
    }

    const blob2 = await pdf((
      <ProtocolPdfGenerator
        orderNumber={orderNumber}
        supervisorName={b2bData.supervisor.name}
        place={b2bData.place}
        myCompany={b2bData.myCompany}
        invoiceDate={invoiceDate}
        productName={b2bData.productName}
        clientFullName={b2bData.client.fullName}
      />
    )).toBlob();
    await window.ipc.invoke('saveFile', { data: await blob2.arrayBuffer(), fileName: protocolFileName });
  };

  const saveToFile = () => { // TODO

  }

  const getLastDayInMonth = (monthNumber: number, year: number) => {
    if (monthNumber === 1
      || monthNumber === 3
      || monthNumber === 5
      || monthNumber === 7
      || monthNumber === 8
      || monthNumber === 10
      || monthNumber === 12
    ) {
      return 31;
    } else if (monthNumber === 4
      || monthNumber === 6
      || monthNumber === 9
      || monthNumber === 11
    ) {
      return 30;
    } else if (monthNumber === 2) {
      if (year % 4 === 0) {
        return 29;
      } else {
        return 28;
      }
    }
  }

  const incrementInputs = () => {
    if (orderNumber) {
      const orderNumberPart1 = parseInt(orderNumber.slice(0, 2));
      const orderNumberPart2 = parseInt(orderNumber.slice(3, 7));
      const newPart1 = orderNumberPart1 !== 12 ? orderNumberPart1 + 1 : 1;
      const newPart2 = orderNumberPart1 !== 12 ? orderNumberPart2 : orderNumberPart2 + 1;
      const newPart1String = newPart1 > 9 ? newPart1 : `0${newPart1}`;
      setOrderNumber(`${newPart1String}/${newPart2}`)
    }
    if (orderDate) {
      const orderNumberPart1 = parseInt(orderDate.slice(3, 5));
      const orderNumberPart2 = parseInt(orderDate.slice(6, 11));
      const newPart1 = orderNumberPart1 !== 12 ? orderNumberPart1 + 1 : 1;
      const newPart2 = orderNumberPart1 !== 12 ? orderNumberPart2 : orderNumberPart2 + 1;
      const newPart1String = newPart1 > 9 ? newPart1 : `0${newPart1}`;
      setOrderDate(`01.${newPart1String}.${newPart2}`)
    }
    if (realizationDate) {
      const orderNumberPart1 = parseInt(realizationDate.slice(3, 5));
      const orderNumberPart2 = parseInt(realizationDate.slice(6, 11));
      const newPart1 = orderNumberPart1 !== 12 ? orderNumberPart1 + 1 : 1;
      const newPart2 = orderNumberPart1 !== 12 ? orderNumberPart2 : orderNumberPart2 + 1;
      const newPart1String = newPart1 > 9 ? newPart1 : `0${newPart1}`;

      const lastDay = getLastDayInMonth(newPart1, newPart2);
      setRealizationDate(`${lastDay}.${newPart1String}.${newPart2}`)
    }
    if (invoiceDate) {
      const orderNumberPart0 = invoiceDate.slice(0, 2);
      const orderNumberPart1 = parseInt(invoiceDate.slice(3, 5));
      const orderNumberPart2 = parseInt(invoiceDate.slice(6, 11));
      const newPart1 = orderNumberPart1 !== 12 ? orderNumberPart1 + 1 : 1;
      const newPart2 = orderNumberPart1 !== 12 ? orderNumberPart2 : orderNumberPart2 + 1;
      const newPart1String = newPart1 > 9 ? newPart1 : `0${newPart1}`;
      setInvoiceDate(`${orderNumberPart0}.${newPart1String}.${newPart2}`)
    }
  }

  const renderButtons = () => {
    if (!b2bData || !orderDate || !orderNumber || !realizationDate || !invoiceDate) {
      return null;
    }
    return (
      <Center style={{
        margin: "1rem",
        flexDirection: "column"
      }}>
        <Center style={{
          margin: "0.5rem"
        }}>
          <Button
            title="Pobierz dokumenty"
            icon='download'
            onClick={generatePdfDocuments}
          />
        </Center>
        <Center style={{
          margin: "0.5rem"
        }}>
          <Button
            isDisabled
            icon='save'
            title="Zapisz obecne dane do pliku"
            onClick={saveToFile}
          />
          <Button
            icon='next'
            title="Inkrementuj inputy"
            onClick={incrementInputs}
          />
        </Center>
      </Center>
    )
  }

  const handleChangeOrderNumber = (value: string) => {
    setOrderNumber(value);
  }
  const handleChangeOrderDate = (value: string) => {
    setOrderDate(value);
  }
  const handleChangeInvoiceDate = (value: string) => {
    setInvoiceDate(value);
  }
  const handleChangeRealizationDate = (value: string) => {
    setRealizationDate(value);
  }
  const handleChangeSpentHours = (value: string) => {
    setSpentHours(parseInt(value));
  }

  if (doesB2bDataJsonExist === false) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">{FILE_NOT_FOUND_TEXT}</strong>
          <span className="block sm:inline"> {":("} </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
        <Button title='Stwórz nowy plik bazy danych' onClick={readSettingsAndCreateTemplate} />
        <Button title='Otwórz istniejący plik bazy danych' onClick={readSettingsFromCustomJsonFile} />
      </div>
    )
  }

  if (!b2bData) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
          <p className="font-bold">{APPLICATION_NOT_LOADED}</p>
          <p className="text-sm">Ładowanie... </p>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
            <Loader />
          </div>
        </div>
      </div>
    )
  }

  const checkIsJsonFileFilledCorrectly = () => {
    const isHourlyRateKnown = b2bData.hourlyRate !== -1;
    const isSpendTimeFilled = b2bData.spentHours !== 0;
    const isNipFilled = b2bData.myCompany.nip.length;
    const isSupervisorKnown = b2bData.supervisor.phone.length && b2bData.supervisor.email.length;
    if (isHourlyRateKnown && isSpendTimeFilled && isNipFilled && isSupervisorKnown) {
      return true;
    }
    return false;
  }

  if (!checkIsJsonFileFilledCorrectly()) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">{FILE_NOT_FILLED_CORRECTLY}</strong>
          <span className="block sm:inline"> {":("} </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
        <Button title='Odśwież' onClick={readSettingsFromDefaultJsonFile} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>B2B PDFs</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* <Background /> */}
        <InteractiveBackground />
        <div className="relative flex flex-col place-items-center">
          <Input label='Numer zamówienia' value={orderNumber} onChange={handleChangeOrderNumber} />
          <Input label='Data zamówienia' value={orderDate} onChange={handleChangeOrderDate} />
          <Input label='Termin realizacji' value={realizationDate} onChange={handleChangeRealizationDate} />
          <Input label='Data wystawienia faktury' value={invoiceDate} onChange={handleChangeInvoiceDate} />
          <Input label='Ilość godzin' type='number' value={spentHours?.toString()} onChange={handleChangeSpentHours} />
          {renderButtons()}
        </div>
      </main>
    </>
  )
}
