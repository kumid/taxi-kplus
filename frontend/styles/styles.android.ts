import { ScaledStyleSheet } from '@/app/ScaledStyleSheet';
 

export default ScaledStyleSheet.create({
  applyButtonDetails: {   
    marginHorizontal: 16,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  applyTextDetails: {
    fontSize: 22,
    color: "#fff", 
  },
  containerDetails: {
    flex: 1,
    // flexGrow: 1,
    paddingTop: 16,
    // backgroundColor: 'red', // Фон для контента
  }, 
  backButton: {
    padding: 16,
  },  
  
  PageTitle: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  titleDetails: {
    // padding:8,
    fontSize: 11,
    
    marginTop:3,
    fontWeight: "bold", 
  },  
  TextTitleDetails: {
    flexGrow: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", 
    textAlignVertical: "center", // Vertically align the text (Android only)
    marginRight: 60,
    includeFontPadding: false, // Optional: Remove extra padding for better centering
  },  

  
  scrolledContainerDetails: {
    display: "flex",
    flexGrow: 1,
    overflow: "scroll",
    maxHeight: 200,    
  },  

  // applyButtonDetails: {   
  //   marginHorizontal: 16,
  //   backgroundColor: "#007AFF",
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: "center",
  // },
  // applyTextDetails: {
  //   fontSize: 22,
  //   color: "#fff", 
  // },

  safeAreaAD: {
    flexGrow: 1,
    paddingHorizontal: 4,
    paddingBottom: 24,
    backgroundColor: '#fff', // Оставляем нейтральный фон для Android
  },

  safeArea: {
    flexGrow: 1,
    paddingHorizontal: 4,
    paddingBottom: 24,
    backgroundColor: '#E0E0E0', // Оставляем нейтральный фон для Android
  },
  // container: {
  //   flex: 1, // Ensures it fills the entire screen 
  //   paddingTop: 10, // Padding for top and bottom edges 
  // },

  // Title Text Style
  TextTitle: {
    fontSize: 20, // Adjust for a prominent title size
    fontWeight: 'bold', // Make the title bold
    color: '#333333', // Dark text color
    margin: 16, // Add spacing after the title
    textTransform: "uppercase" 
  }, 
  topSection: {
    flexDirection: "row",
    alignItems: "stretch", 
  },
  rowStyleContainer: { 
    flex: 1, // Ensures the rowStyleContainer takes up remaining space
    alignItems: "stretch",
  }, 
  
  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold", 
  // },
  // subtitle: {
  //   color: "#231F20",
  //   fontSize: 12,
  //   textAlign:"left",
  //   flex: 1,
  //   marginTop:8,
  // },
  middleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  amount: { 
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  ratingText: {
    fontSize: 13,
    marginRight: 5,
  },
  reviews: {
    color: "#888",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  detailsButton: {
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 5,
    width: "50%",
    
    marginStart:"-1%",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    marginLeft:"2%",
    width: "50%",
    alignItems: "center",
  }, 
  // Body Text Style
  TextBody: {
    fontSize: 14.5, 
    marginBottom:16 ,// Slightly smaller than the title
    fontWeight: 'normal', // Regular weight
    color: '#666666', // A lighter gray for body text
    lineHeight: 16, // Spacing between lines for better readability
    // textAlign: 'center', // Center-align the body text
    marginHorizontal: 16, // Add some horizontal margins for better readability
  },

  // Free Height Filler
  freeHeight: {
    flexGrow: 1, // This will fill the remaining vertical space 
  },

  listContent: {
    paddingBottom: 16, // Add padding to ensure the last item isn't cut off
  },
  // container: {
  //   flex: 1,
  //   // flexGrow: 1,
  //   paddingTop: 16,
  //   // backgroundColor: 'red', // Фон для контента
  // },
  backRowStyle: { 
    flexDirection: "row",
  }, 

  
  scrolledContainer: {
    display: "flex",
    flexGrow: 1,
    overflow: "scroll",
    maxHeight: 200,    
  },
  /// Footer
  footerContainer: {
    display: "flex",
    flexGrow: 2,
    minHeight: 80,
    // backgroundColor: 'green', // Фон для контента
    justifyContent: 'flex-end',
    paddingBottom: 16
  },

  applyButtonFirstFrame: {   
    marginHorizontal: 16,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  applyText: {
    fontSize: 16,
    color: "#fff", 
    textTransform: "uppercase" 
  },
 
  rowStyle: {
    // justifyContent: "space-between", // Distributes space between elements
    marginBottom: 5, // Adds some vertical spacing between rows
    // flexDirection: "row",
  },

  title: {
    fontSize: 15,
    marginVertical: -1,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#231F20",
    fontSize: 12,
    flex: 1,
    // backgroundColor:"plum"
    // textAlign:"center",
  },
  
  bannerCard: {
    borderRadius: 20, // Меньший радиус углов для Android
    margin: 16,
    alignItems: 'center',
    width: '94%',
    height: "73%",
    padding: 15,
    backgroundColor: '#FFF',
  },
  bannerAdS3: {
    flex: 1,
    zIndex: 0,
    alignItems: 'center',
    width: '100%',
    padding: 6,
  },
  // TextTitle: {
  //   textAlign: "center",
  //   fontSize: 24, // Меньше размера текста для Android
  //   fontFamily: "inter_medium",
  //   fontWeight: 'bold',
  //   color: '#000',
  // },
  TextAfterTitle: {
    fontSize: 12, // Меньший размер текста для Android
    textAlign: "start",
    fontWeight:"bold",
    fontFamily: "inter_regular",
    color: '#333', // Темнее оттенок текста
  },
  ROW: {
    flexDirection: 'row',
    gap: 8, // Меньше расстояние между элементами
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "-15%",
  },
  miniButton: {
    width: 14, // Меньший размер индикаторов
    height: 14,
    backgroundColor: "#A0A0A0", // Темнее серый цвет
    borderRadius: 7,
  },
  miniActiveButton: {
    width: 14,
    height: 14,
    backgroundColor: 'blue', // Зеленый цвет для активной кнопки
    borderRadius: 7,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E0E0E0', // Серый фон для Android
  },
  containerAD: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff', // Серый фон для Android
  },
  
  containerAD2: {
    flex: 1, 
    backgroundColor: '#fff', // Серый фон для Android
  },
  banner: {
    flex: 1,
    zIndex: 0,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: '#FFF',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: "5%",
    marginVertical: 5,
  },
  radioCircle: {
    height: 10,
    width: 10 ,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007aff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#007aff',
  },
  optionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  button: {
    marginTop: 100,
    marginBottom: 20,
    backgroundColor: '#007AFF', // Яркий голубой для Android
    padding: 15,
    textAlign: "center",
    width: 300,
    borderRadius: 15, // Меньший радиус для Android
  },
 
  label: {
    
    marginHorizontal: "5%", 
    fontSize: 15,
    // marginBottom: 10,
    fontWeight: 'bold', 
  },
  input: {
    
    fontWeight:"bold",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal:"4%",
    padding: 10,
    marginBottom: 20,
  },
  titleAD: {
    fontSize: 16,
    
    marginHorizontal: "5%", 
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
  },
  option: { 
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5, 
  },
  optionSelected: {
    backgroundColor: '#cce7ff',
    borderColor: '#007aff',
  }, 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 14,
    color: '#888',
  },
  notificationIcon: {
    marginLeft: 'auto',
  }, 
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },



  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyDescription: {
    fontSize: 14,
    color: '#888',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  star: {
    fontSize: 16,
    color: '#FFD700',
  }, 
  infoBox: {
    backgroundColor: '#f0f4ff',
    padding: 14,
    marginHorizontal: "3%",
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginHorizontal:"4%"
  },
});
