import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';
import 'package:lucia/Screens/BorrowerScreens/NewLoanBorrowing.dart';
import 'package:lucia/Screens/BorrowerScreens/Tabs/CreditTab.dart';
import 'package:lucia/Screens/BorrowerScreens/Tabs/FlashLoansTab.dart';
import 'package:lucia/Screens/BorrowerScreens/Tabs/LoansTab.dart';
import 'package:lucia/Widgets/DrawerWidget.dart';

import '../../Constants/enums.dart';

class MainBorrowingScreen extends StatefulWidget {
  const MainBorrowingScreen({super.key});

  @override
  State<MainBorrowingScreen> createState() => _MainBorrowingScreenState();
}

class _MainBorrowingScreenState extends State<MainBorrowingScreen> {
  int selectedIndex = 1;

  onTabSelected(int i) {
    setState(() {
      selectedIndex = i;
    });
  }

  final titles = ["Credit Score", "Loan Details", "Flash Loans"];

  final tabs = [
    CreditTab(),
    LoansTab(),
    FlashLoansTab(),
  ];

  final fabLabels = ["Add Wallet", "New Loan", "New FlashLoan"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kWhite,
      appBar: AppBar(
        elevation: 1,
        backgroundColor: kWhite,
        iconTheme: const IconThemeData(color: kBlack),
        centerTitle: true,
        title: Text(
          titles[selectedIndex],
          style: k15SemiBold.copyWith(color: kBlack),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        label: Text(
          fabLabels[selectedIndex],
          style: k13Medium,
        ),
        onPressed: () {
          switch (selectedIndex) {
            ///Add Wallet
            case 0:
              break;

            ///New Loan
            case 1:
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => NewLoanBorrowing(),
                ),
              );

            ///New FlashLoan
            case 2:
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => NewLoanBorrowing(),
                ),
              );
          }
        },
        backgroundColor: kLightOrange,
      ),
      drawer: const DrawerWidget(
        userType: UserType.borrower,
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: selectedIndex,
        selectedItemColor: kLightOrange,
        iconSize: 28,
        onTap: onTabSelected,
        elevation: 2,
        unselectedItemColor: kGrey,
        showUnselectedLabels: true,
        selectedLabelStyle: k13Medium.copyWith(color: kBlack),
        unselectedLabelStyle: k13Medium.copyWith(color: kGrey),
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.monetization_on_outlined),
            label: 'Credit',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.money),
            label: 'Loans',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.airplane_ticket_outlined),
            label: 'Flash Loans',
          ),
        ],
      ),
      body: tabs[selectedIndex],
    );
  }
}
