import 'package:cloud_firestore/cloud_firestore.dart';

class DatabaseServices {
  final db = FirebaseFirestore.instance;

  addEmailToWaitList(String email) async {
    await db.collection("WaitList").add(
      {
        "email": email,
        "time": DateTime.now(),
      },
    );
  }
}
