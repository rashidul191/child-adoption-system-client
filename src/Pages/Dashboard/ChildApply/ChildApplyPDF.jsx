import React from "react";
import { Document, Page, Text, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "45px",
    fontSize: "13px",
  },
  hederText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
  },

  highlightText: {
    fontSize: "20px",
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

  textStyle: {
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "underline",
  },
});

const ChildApplyPDF = ({ childApply }) => {
  console.log(childApply);
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
            <Text>
              Application Date:{" "}
              <Text style={{ color: "#068694" }}>
                {childApply?.applicationDate}
              </Text>
            </Text>
          </div>
        </div>
        {/* Child Information Here */}
        <div>
          <Text style={styles.highlightText}>Child Information</Text>

          <div style={styles.displayFlex}>
            <div>
              <div style={styles.displayFlex}>
                <Text style={styles.marginStyle}>
                  Name:{" "}
                  <Text style={styles.textStyle}>
                    {childApply?.child?.name}
                  </Text>
                </Text>
                <Text style={styles.marginStyle}>
                  Gender:{" "}
                  <Text style={styles.textStyle}>
                    {childApply?.child?.gender}
                  </Text>
                </Text>
                <Text>
                  Age:{" "}
                  <Text style={styles.textStyle}>{childApply?.child?.age}</Text>{" "}
                </Text>
              </div>

              <div style={styles.displayFlex}>
                <Text style={styles.marginStyle}>
                  Religion:{" "}
                  <Text style={styles.textStyle}>
                    {childApply?.child?.religion}
                  </Text>
                </Text>

                <Text style={styles.marginStyle}>
                  Child Type:{" "}
                  <Text style={styles.textStyle}>
                    {childApply?.child?.childType}
                  </Text>
                </Text>
                <Text style={styles.marginStyle}>
                  Disabilities:{" "}
                  <Text style={styles.textStyle}>
                    {childApply?.child?.disabilities}
                  </Text>
                </Text>
              </div>

              <div style={styles.displayFlex}>
                <Text style={styles.marginStyle}>
                  Location:{" "}
                  <Text style={styles.textStyle}>
                    {childApply?.child?.location}
                  </Text>
                </Text>
                <Text style={styles.marginStyle}>
                  City:{" "}
                  <Text style={styles.textStyle}>
                    {childApply?.child?.city}
                  </Text>
                </Text>
              </div>
            </div>
            <div>
              <Image
                style={{ width: "120px", marginLeft: "20px" }}
                src={childApply?.child?.img}
                alt="img"
              />
            </div>
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
              <Text style={styles.textStyle}>{childApply?.data?.gender}</Text>
            </Text>
            <Text>
              Nid Number:{" "}
              <Text style={styles.textStyle}>
                {childApply?.data?.nidPassport}
              </Text>{" "}
            </Text>
          </div>

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Citizenship:{" "}
              <Text style={styles.textStyle}>
                {childApply?.data?.citizenship}
              </Text>
            </Text>

            <Text style={styles.marginStyle}>
              Birth Date:{" "}
              <Text style={styles.textStyle}>
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
              <Text style={styles.textStyle}>{childApply?.data?.gender2}</Text>
            </Text>
            <Text>
              Nid Number:{" "}
              <Text style={styles.textStyle}>
                {childApply?.data?.nidPassport2}
              </Text>{" "}
            </Text>
          </div>

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Citizenship:{" "}
              <Text style={styles.textStyle}>
                {childApply?.data?.citizenship2}
              </Text>
            </Text>

            <Text style={styles.marginStyle}>
              Birth Date:{" "}
              <Text style={styles.textStyle}>
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
              Email: <Text style={styles.textStyle}>{childApply?.email}</Text>
            </Text>
            <Text>
              Phone Number:{" "}
              <Text style={styles.textStyle}>
                {childApply?.data?.phoneNumber}
              </Text>{" "}
            </Text>
          </div>

          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              Address:{" "}
              <Text style={styles.textStyle}>{childApply?.data?.address}</Text>
            </Text>

            <Text style={styles.marginStyle}>
              City:{" "}
              <Text style={styles.textStyle}>{childApply?.data?.city}</Text>
            </Text>
          </div>
          <div style={styles.displayFlex}>
            <Text style={styles.marginStyle}>
              State:{" "}
              <Text style={styles.textStyle}>{childApply?.data?.state}</Text>
            </Text>

            <Text style={styles.marginStyle}>
              Zip Code:{" "}
              <Text style={styles.textStyle}>{childApply?.data?.zipCode}</Text>
            </Text>

            <Text style={styles.marginStyle}>
              Country:{" "}
              <Text style={styles.textStyle}>{childApply?.data?.country}</Text>
            </Text>
          </div>
        </div>
        {/* Approve Signature */}
        <div>
          <div style={styles.displayFlex}>
            <div>
              <Text
                style={{
                  marginTop: "30px",
                }}
              >
                ............................
              </Text>
              <Text
                style={{
                  borderTop: "2px solid black",
                }}
              >
                <Text>Parent Signature</Text>
              </Text>
            </div>

            <div>
              <Text
                style={{
                  margin: "30px 0px 0px 90px",
                }}
              >
                {childApply?.child?.agency}
              </Text>
              <Text
                style={{
                  borderTop: "2px solid black",
                  margin: "8px 80px 0px 80px",
                }}
              >
                <Text>Agency Signature</Text>
              </Text>
            </div>

            <div>
              <Text
                style={{
                  marginTop: "30px",
                }}
              >
                Md Rashidul Islam
              </Text>
              <Text
                style={{
                  borderTop: "2px solid black",
                  marginTop: "8px",
                }}
              >
                <Text> Author Signature</Text>
              </Text>
            </div>
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
