import 'package:flutter/material.dart';
import 'package:lucia/Constants/enums.dart';
import 'package:lucia/Screens/DrawerScreens/AccountScreen.dart';
import 'package:lucia/Screens/DrawerScreens/CreditScore.dart';
import 'package:lucia/Screens/DrawerScreens/TransactionHistory.dart';
import 'package:lucia/Screens/UserTypeScreen.dart';

import '../Constants/colors.dart';
import '../Constants/styles.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({
    Key? key,
    required this.userType,
  }) : super(key: key);

  final UserType userType;

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          ///Menu Header
          DrawerHeader(
            margin: EdgeInsets.zero,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'John Doe',
                  style: k25SemiBold.copyWith(color: kBlack),
                ),

                const SizedBox(height: 16),

                ///Connected
                Row(
                  children: [
                    ///Connected
                    Text(
                      "Connected",
                      style: k13Medium.copyWith(color: kBlack),
                    ),

                    const SizedBox(width: 16),

                    ///Wallet ID
                    Expanded(
                      child: Text(
                        "0x343...332",
                        style: k13Medium.copyWith(color: kBlack),
                        textAlign: TextAlign.right,
                        maxLines: 1,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          ///Account
          ListTile(
            leading: const Icon(Icons.person, color: kBlack),
            title: Text("Account", style: k16Regular.copyWith(color: kBlack)),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const AccountScreen(),
                ),
              );
            },
          ),

          const Divider(thickness: 1),

          ///Transaction History
          ListTile(
            leading: const Icon(Icons.history, color: kBlack),
            title: Text("Transaction History",
                style: k16Regular.copyWith(color: kBlack)),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => TransactionHistory(userType: userType),
                ),
              );
            },
          ),

          const Divider(thickness: 1),

          ///Settings
          ListTile(
            leading: const Icon(Icons.settings_outlined, color: kBlack),
            title: Text("Settings", style: k16Regular.copyWith(color: kBlack)),
            onTap: () {},
          ),

          const Divider(thickness: 1),

          ///Credit Score
          ListTile(
            leading: const Icon(Icons.credit_score, color: kBlack),
            title:
                Text("Credit Score", style: k16Regular.copyWith(color: kBlack)),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const CreditScore(),
                ),
              );
            },
          ),

          const Divider(thickness: 1),

          ///KYC
          ListTile(
            leading: const Icon(Icons.person_pin_rounded, color: kBlack),
            title: Text("KYC", style: k16Regular.copyWith(color: kBlack)),
            onTap: () {},
          ),

          const Divider(thickness: 1),

          ///Logout
          ListTile(
            leading: const Icon(Icons.logout, color: kBlack),
            title: Text("Logout", style: k16Regular.copyWith(color: kBlack)),
            onTap: () async {
              await showDialog(
                context: context,
                builder: (context) {
                  return AlertDialog(
                    title: Text(
                      'Logout Confirmation',
                      style: k18Medium.copyWith(color: kBlack),
                    ),
                    content: Text(
                      'Are you sure you want to logout?',
                      style: k15Medium.copyWith(color: kBlack),
                    ),
                    actions: <Widget>[
                      TextButton(
                        child: Text(
                          'No',
                          style: k13Medium.copyWith(color: kBlue),
                        ),
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                      ),
                      TextButton(
                        child: Text(
                          'Yes',
                          style: k13Medium.copyWith(color: kRed),
                        ),
                        onPressed: () {
                          Navigator.of(context).pop(true);
                          // Logout the user here.
                        },
                      ),
                    ],
                  );
                },
              ).then((value) {
                if (value != null) {
                  ///Logging Out
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const UserTypeScreen(),
                    ),
                  );
                }
              });
            },
          ),

          const Divider(thickness: 1),
        ],
      ),
    );
  }
}
