'use client'
import {
  Document, Page, Text, View, Font,
} from '@react-pdf/renderer';
import { styles } from './ProtocolPdfGenerator.styles';
import { MyCompany } from '../appInterfaces';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf', fontStyle: 'bold' },
  ],
});

interface ProtocolPdfGeneratorProps {
  orderNumber: string;
  supervisorName: string;
  place: string;
  myCompany: MyCompany;
  invoiceDate: string;
  productName: string;
  clientFullName: string;
}

const ProtocolPdfGenerator = ({
  orderNumber, supervisorName, place, myCompany, invoiceDate, productName,
  clientFullName,
}: ProtocolPdfGeneratorProps) => {
  const placeAndDate = `${place}, ${invoiceDate}`;
  
  const title = `PROTOKÓŁ ODBIORU PRAC WG ZAMÓWIENIA NR ${orderNumber}`;
  const disclaimer = `Niniejszym potwierdzam odbiór produktów zgodnie z zamówieniem nr ${orderNumber} i nie wnoszę żadnych uwag.`;
  
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

  const renderTable = () => {
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
              <Text style={styles.normalBold}>Wykonawca</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{myCompany.name}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.normalBold}>Zamawiający</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.normal}>{clientFullName}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <Document>
      <Page size="A4" wrap style={styles.page}>
        {renderHeader()}
        <Text style={styles.title}>{title}</Text>
        {renderTable()}
        <Text style={styles.disclaimer}>{disclaimer}</Text>
        <View style={styles.signaturesWrapper}>
          <View style={styles.singleSignature}>
            <Text style={styles.signatureValue}>{placeAndDate}</Text>
            <View style={styles.signatureLabel}>
              <Text style={styles.signatureLabelText}>miejsce i data</Text>
            </View>
          </View>
          <View style={styles.singleSignature}>
            <Text style={styles.signatureValue}>{supervisorName}</Text>
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
      </Page>
    </Document>
  )
}

export default ProtocolPdfGenerator