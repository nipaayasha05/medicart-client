// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import Logo from "../../Shared/Logo/Logo";

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// const Invoice = ({ invoice }) => {
//   console.log(invoice);
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           {/* <Logo /> */}
//           {/* <Image style={styles.logo} src="../../assets/medicine.png" alt="" /> */}
//           <Text>Section #1</Text>
//           <Text>Section #1</Text>
//           <Text>Section #1</Text>
//           <Text>Section #1</Text>
//           <Text>Section #1</Text>
//           <Text>Section #1</Text>
//           <Text>Section #1</Text>
//           <Text>Section #1</Text>
//         </View>
//         {/* <View style={styles.section}>
//           <Text>Section #2</Text>
//           <Text>Section #2</Text>
//           <Text>Section #2</Text>
//           <Text>Section #2</Text>
//           <Text>Section #2</Text>
//         </View> */}
//       </Page>
//     </Document>
//   );
// };

// export default Invoice;
