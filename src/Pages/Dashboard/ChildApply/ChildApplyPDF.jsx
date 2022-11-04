import React from "react";
import { Document, Page, Text, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "0 45px",
    fontSize: "13px",
  },
  hederText: {
    color: "blue",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
  },

  highlightText: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    backgroundColor: "yellow",
    margin: "20px 0px 10px 0px",
  },
  displayFlex: {
    flexDirection: "row",
    margin: "6px 0px",
  },
  marginStyle: {
    marginRight: "15px",
  },
});

const ChildApplyPDF = ({ childApply }) => {
  // console.log(childApply?.child);
  console.log(childApply?.data);
  // const {} = childApply.data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div style={{ textAlign: "center" }}>
          <Text style={styles.hederText}>Child Adoption System-Ador</Text>
          <Text>Every Child Should Get A Quality Place and Education</Text>
          <div>
            <Text>Email: casa@gmail.com</Text>
            <Text>Call: 01629226069</Text>
          </div>
          <div>
            <Text>West Shewrapara, Mirpur-10, Dhaka</Text>
            <Text>Bangladesh</Text>
          </div>
        </div>
        {/* Child Information Here */}
        <div>
          <Text style={styles.highlightText}>Child Information</Text>
          <Image
            style={{ width: "100px" }}
            src={childApply?.child?.img}
            alt="img"
          />

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Name:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  fontStyle: "italic",
                }}
              >
                {childApply?.child?.name}
              </Text>
            </Text>
            <Text style={styles.marginStyle}>
              Gender:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.child?.gender}
              </Text>
            </Text>
            <Text>
              Age:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.child?.age}
              </Text>{" "}
            </Text>
          </div>

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Religion:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.child?.religion}
              </Text>
            </Text>

            <Text style={styles.marginStyle}>
              Child Type:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.child?.childType}
              </Text>
            </Text>
            <Text style={styles.marginStyle}>
              Disabilities:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.child?.disabilities}
              </Text>
            </Text>
          </div>

          <div>
            <Text style={styles.marginStyle}>
              Location:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.child?.location}
              </Text>
            </Text>
            <Text style={styles.marginStyle}>
              City:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.child?.city}
              </Text>
            </Text>
          </div>
        </div>
        {/* Parent-1 Information Here */}
        <div>
          <Text style={styles.highlightText}>Parent-1 Information</Text>

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Name:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {childApply?.data?.displayName}
              </Text>
            </Text>
            <Text style={styles.marginStyle}>
              Gender:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.gender}
              </Text>
            </Text>
            <Text>
              Nid Number:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.nidPassport}
              </Text>{" "}
            </Text>
          </div>

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Citizenship:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.citizenship}
              </Text>
            </Text>

            <Text style={styles.marginStyle}>
              Birth Date:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.birthDate}
              </Text>
            </Text>
          </div>
        </div>
        {/* Parent-2 Information Here */}
        <div>
          <Text style={styles.highlightText}>Parent-2 Information</Text>
          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Name:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {childApply?.data?.displayName2}
              </Text>
            </Text>
            <Text style={styles.marginStyle}>
              Gender:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.gender2}
              </Text>
            </Text>
            <Text>
              Nid Number:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.nidPassport2}
              </Text>{" "}
            </Text>
          </div>

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Citizenship:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.citizenship2}
              </Text>
            </Text>

            <Text style={styles.marginStyle}>
              Birth Date:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.birthDate2}
              </Text>
            </Text>
          </div>
        </div>
        {/* Contact Information Here */}
        <div>
          <Text style={styles.highlightText}>Contact Information</Text>
          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Email:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {childApply?.email}
              </Text>
            </Text>
            <Text>
              Phone Number:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.phoneNumber}
              </Text>{" "}
            </Text>
          </div>

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Address:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.address}
              </Text>
            </Text>

            <Text style={styles.marginStyle}>
              City:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.city}
              </Text>
            </Text>
          </div>
          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              State:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.state}
              </Text>
            </Text>

            <Text style={styles.marginStyle}>
              Zip Code:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.zipCode}
              </Text>
            </Text>

            <Text style={styles.marginStyle}>
              Country:{" "}
              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {childApply?.data?.country}
              </Text>
            </Text>
          </div>
        </div>
        {/* Approve Signature */}
        <div>
          <div style={styles.displayFlex}>
            <Text
              style={{
                borderTop: "2px solid black",
                margin: "20px 0px 0px 0px",
              }}
            >
              <Text>Parent Signature</Text>
            </Text>

            <Text
              style={{
                borderTop: "2px solid black",
                margin: "20px 80px 0px 80px",
              }}
            >
              <Text>Agency Signature</Text>
            </Text>

            <Text
              style={{
                borderTop: "2px solid black",
                margin: "20px 0px 0px 0px",
              }}
            >
              <Text> Author Signature</Text>
            </Text>
          </div>
        </div>

        
        <Text
          style={{ textAlign: "center", marginTop: "20px" }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        ></Text>
      </Page>
    </Document>
  );
};

export default ChildApplyPDF;
