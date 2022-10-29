import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const ChildApplyPDF = ({childApply}) => {
  console.log(childApply)
  return (
    <Document>
      <Page size="A4" style={styles?.page}>
        <Text>Section #1</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vitae
          a perferendis excepturi blanditiis. Maxime blanditiis quos nulla quo
          iure!
        </Text>

        <Text render={({pageNumber, totalPages})=> `${pageNumber} / ${totalPages}`}></Text>
      </Page>
    </Document>
  );
};

export default ChildApplyPDF;
