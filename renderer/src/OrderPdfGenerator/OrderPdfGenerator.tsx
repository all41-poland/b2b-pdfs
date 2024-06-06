'use client'
import {
  Document, Page, Text, View, Font,
} from '@react-pdf/renderer';
import { styles } from './OrderPdfGenerator.styles';
import { ClientCompany, MyCompany, Supervisor } from '../appInterfaces';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf', fontStyle: 'bold' },
  ],
});

interface OrderPdfGeneratorProps {
  orderNumber: string;
  supervisor: Supervisor;
  place: string;
  myCompany: MyCompany;
  realizationDate: string;
  orderDate: string;
  myName: string;
  spentHours: number;
  hourlyRate: number;
  productName: string;
  clientCompany: ClientCompany;
}

const addSeparator = (str: string) => {
  const x = str.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
}

const OrderPdfGenerator = ({
  orderNumber, supervisor, place, myCompany, productName,
  realizationDate, orderDate, myName, hourlyRate, spentHours, 
  clientCompany,
}: OrderPdfGeneratorProps) => {

  const placeAndOrderDate = `${place}, ${orderDate}`;

  const title1 = `ZAMÓWIENIE NR ${orderNumber}`;
  const title2 = "Zamówienie usług w zakresie programowania";
  const disclaimerClient = `wypełnia klient (${clientCompany.shortName})`;
  const disclaimerSubcontactor = "wypełnia dostawca (podwykonawca)";


  const salary = addSeparator((spentHours * hourlyRate).toFixed(2));

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.normal}>{myCompany.name}</Text>
        <Text style={styles.normal}>{myCompany.address}</Text>
        <Text style={styles.normal}>{myCompany.zipCodeAndPostOffice}</Text>
        <Text style={styles.normal}>NIP: {myCompany.nip}</Text>
      </View>
    );
  }

  const renderTable1 = () => {
    return (
      <View style={styles.flex}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Zakres prac</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{productName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Termin</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{realizationDate}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Wykonawca</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{myCompany.name}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderHalfTable1 = () => {
    return (
      <View style={styles.halfTable1}>
        <View style={styles.halfTableHeader}>
          <Text style={styles.halfTableHeaderText}>{`Dane osoby kontaktowej (z ${clientCompany.shortName})`}</Text>
        </View>
        <View style={styles.halfTableRow}>
          <View style={styles.halfTableCol1}>
            <Text style={styles.normalBold}>Imię i nazwisko</Text>
          </View>
          <View style={styles.halfTableCol2}>
            <Text style={styles.normal}>{supervisor.name}</Text>
          </View>
        </View>
        <View style={styles.halfTableRow}>
          <View style={styles.halfTableCol1}>
            <Text style={styles.normalBold}>Stanowisko</Text>
          </View>
          <View style={styles.halfTableCol2}>
            <Text style={styles.normal}>Team Lead</Text>
          </View>
        </View>
        <View style={styles.halfTableRow}>
          <View style={styles.halfTableCol1}>
            <Text style={styles.normalBold}>Telefon</Text>
          </View>
          <View style={styles.halfTableCol2}>
            <Text style={styles.normal}>{supervisor.phone}</Text>
          </View>
        </View>
        <View style={styles.halfTableRow}>
          <View style={styles.halfTableCol1}>
            <Text style={styles.normalBold}>e-mail</Text>
          </View>
          <View style={styles.halfTableCol2}>
            <Text style={styles.normalEmail}>{supervisor.email}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderHalfTable2 = () => {
    return (
      <View style={styles.halfTable2}>
        <View style={styles.halfTableHeader}>
          <Text style={styles.halfTableHeaderText}>{`Dane firmy (z ${clientCompany.shortName})`}</Text>
        </View>
        <View style={styles.halfTableRow}>
          <View style={styles.halfTableCol1}>
            <Text style={styles.normalBold}>Pełna nazwa</Text>
          </View>
          <View style={styles.halfTableCol2}>
            <Text style={styles.normal}>{clientCompany.fullName}</Text>
          </View>
        </View>
        <View style={styles.halfTableRow}>
          <View style={styles.halfTableCol1}>
            <Text style={styles.normalBold}>Adres</Text>
          </View>
          <View style={styles.halfTableCol2}>
            <Text style={styles.normal}>{clientCompany.address}</Text>
          </View>
        </View>
        <View style={styles.halfTableRow}>
          <View style={styles.halfTableCol1}>
            <Text style={styles.normalBold}>Kod, miasto</Text>
          </View>
          <View style={styles.halfTableCol2}>
            <Text style={styles.normal}>{clientCompany.zipCodeAndPostOffice}</Text>
          </View>
        </View>
        <View style={styles.halfTableRow}>
          <View style={styles.halfTableCol1}>
            <Text style={styles.normalBold}>NIP</Text>
          </View>
          <View style={styles.halfTableCol2}>
            <Text style={styles.normal}>{clientCompany.nip}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderTable4 = () => {
    return (
      <View style={styles.flex}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Termin realizacji</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{realizationDate}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Konsultant</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{myName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Liczba godzin</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{spentHours}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Stawka za godzinę</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{`${hourlyRate} PLN`}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Wartość usługi</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{`${salary} PLN`}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderSignatures1 = () => {
    return (
      <View style={styles.signaturesWrapper}>
        <View style={styles.singleSignature}>
          <Text style={styles.signatureValue}>{placeAndOrderDate}</Text>
          <View style={styles.signatureLabel}>
            <Text style={styles.signatureLabelText}>miejsce i data</Text>
          </View>
        </View>
        <View style={styles.singleSignature}>
          <Text style={styles.signatureValue}>{supervisor.name}</Text>
          <View style={styles.signatureLabel}>
            <Text style={styles.signatureLabelText}>imię i nazwisko zamawiającego</Text>
          </View>
        </View>
        <View style={styles.singleSignature}>
          <View style={styles.signatureLabel}>
            <Text style={styles.signatureLabelText}>podpis</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderSignatures2 = () => {
    return (
      <View style={styles.signaturesWrapper}>
        <View style={styles.singleSignature}>
          <Text style={styles.signatureValue}>{placeAndOrderDate}</Text>
          <View style={styles.signatureLabel}>
            <Text style={styles.signatureLabelText}>miejsce i data</Text>
          </View>
        </View>
        <View style={styles.singleSignature}>
          <Text style={styles.signatureValue}>{myName}</Text>
          <View style={styles.signatureLabel}>
            <Text style={styles.signatureLabelText}>imię i nazwisko wykonawcy</Text>
          </View>
        </View>
        <View style={styles.singleSignature}>
          <View style={styles.signatureLabel}>
            <Text style={styles.signatureLabelText}>podpis</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <Document>
      <Page size="A4" wrap style={styles.page}>
        {renderHeader()}
        <Text style={styles.title1}>{title1}</Text>
        <Text style={styles.title2}>{title2}</Text>
        <Text style={styles.disclaimerClient}>{disclaimerClient}</Text>
        {renderTable1()}
        <View style={styles.halfTablesContainer}>
          {renderHalfTable1()}
          {renderHalfTable2()}
        </View>
        {renderSignatures1()}
        <Text style={styles.disclaimerSubcontractor}>{disclaimerSubcontactor}</Text>
        {renderTable4()}
        {renderSignatures2()}
      </Page>
    </Document>
  )
}

export default OrderPdfGenerator