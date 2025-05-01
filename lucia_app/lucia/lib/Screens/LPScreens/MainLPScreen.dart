import 'package:flutter/material.dart';
import 'package:lucia/Constants/enums.dart';
import 'package:lucia/Screens/LPScreens/NewLoanLending.dart';
import 'package:lucia/Screens/LPScreens/Tabs/AwardsTab.dart';
import 'package:lucia/Screens/LPScreens/Tabs/ProfileTab.dart';

import '../../Constants/colors.dart';
import '../../Constants/styles.dart';
import '../../Widgets/DrawerWidget.dart';
import 'Tabs/LendingsTab.dart';

class MainLPScreen extends StatefulWidget {
  const MainLPScreen({super.key});

  @override
  State<MainLPScreen> createState() => _MainLPScreenState();
}

class _MainLPScreenState extends State<MainLPScreen> {
  int selectedIndex = 1;

  onTabSelected(int i) {
    setState(() {
      selectedIndex = i;
    });
  }

  final titles = ["Profile", "Lending", "Awards"];

  final tabs = const [
    ProfileTab(),
    LendingTab(),
    AwardsTab(),
  ];

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
      drawer: const DrawerWidget(
        userType: UserType.lender,
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
            label: 'Profile',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.money),
            label: 'Lending',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.card_giftcard_outlined),
            label: 'Awards',
          ),
        ],
      ),

      ///New Loan(Only for Lending Screen)
      floatingActionButton: selectedIndex == 1
          ? FloatingActionButton.extended(
              label: Text(
                "New Loan",
                style: k13Medium,
              ),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => NewLoanLending(),
                  ),
                );
              },
              backgroundColor: kLightOrange,
            )
          : const SizedBox(),
      body: tabs[selectedIndex],
    );
  }
}
