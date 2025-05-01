import 'package:flutter/material.dart';
import 'package:lucia/Constants/colors.dart';
import 'package:lucia/Constants/styles.dart';

class BackButtonScaffold extends StatelessWidget {
  const BackButtonScaffold({super.key, this.child, required this.title});
  final Widget? child;
  final String title;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kWhite,
      appBar: AppBar(
        backgroundColor: kWhite,
        elevation: 1,
        centerTitle: true,
        title: Text(
          title,
          style: k16Medium,
        ),
        leading: IconButton(
          icon: const Icon(
            Icons.keyboard_arrow_left,
            color: kBlack,
          ),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: child ?? const SizedBox(),
      ),
    );
  }
}
