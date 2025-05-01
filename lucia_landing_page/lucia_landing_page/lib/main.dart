import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:lucia_landing_page/Screens/HomePage.dart';
import 'package:provider/provider.dart';

import 'Constants/colors.dart';
import 'Providers/MainProvider.dart';
import 'firebase_options.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  ///Analytics
  static FirebaseAnalytics analytics = FirebaseAnalytics.instance;
  static FirebaseAnalyticsObserver observer =
      FirebaseAnalyticsObserver(analytics: analytics);

  ///Firebase
  final Future<FirebaseApp> _initialization = Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => MainProvider()),
      ],
      child: FutureBuilder(
        future: _initialization,
        builder: (context, snapshot) {
          if (snapshot.hasError) return Container(color: Colors.amber);
          if (snapshot.connectionState == ConnectionState.done) {
            return MaterialApp(
              title: "Lucia",
              navigatorObservers: <NavigatorObserver>[MyApp.observer],
              home: const HomePage(),
            );
          }
          return Container(color: kBlack);
        },
      ),
    );
  }
}
