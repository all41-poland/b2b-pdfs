'use client'
import {StyleSheet} from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
      backgroundColor: '#FFF',
      padding: "32 64",
      fontFamily: 'Roboto',
      // fontFamily: 'Arial',
      fontSize: 12,
    },
    header: {
      fontSize: 11,
      borderBottom: "1px solid black",
      paddingBottom: "4px",
    },
    title: {
      marginTop: "64px",
      fontSize: 11,
    },
    normal: {
      fontSize: 10,
    },
    disclaimer: {
      fontSize: 10,
      marginTop: "32px",
    },
    normalBold: {
      fontSize: 10,
      fontStyle: "bold",
    },
    signaturesWrapper: {
      marginTop: "64px",
      display: 'flex',
      flexDirection: "row",
    },
    singleSignature: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      margin: "8px",
      padding: "2px",
      width: "30%",
    },
    signatureValue: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2px",
      fontSize: 10,
      // fontStyle: "italic",
    },
    signatureLabel: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: "2px",
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
    },
    signatureLabelText: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 8,
      // fontStyle: "italic",
    },
    flex: {
      display: 'flex',
      marginTop: 6,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    table: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCol1: {
      width: "20%",
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      paddingLeft: 4,
      backgroundColor: "#DDD",
    },
    tableCol2: {
      width: "80%",
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      paddingLeft: 4,
    },
  });