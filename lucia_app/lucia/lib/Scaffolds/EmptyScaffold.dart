import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';

class EmptyScaffold extends StatelessWidget {
  const EmptyScaffold({super.key, this.child});
  final Widget? child;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kWhite,
      body: SafeArea(
        child: child ?? const SizedBox(),
      ),
    );
  }
}
