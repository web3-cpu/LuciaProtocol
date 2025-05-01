#  iOS SDK


To install an SDK in a Swift project using Swift Package Manager (SPM), follow these steps:

1. Open your terminal.

2. Navigate to your project directory if you aren't already there:

   ```bash
   cd /path/to/your/project
3. Edit your Package.swift file

    ```swift
    // Package.swift

    import PackageDescription

    let package = Package(
        name: "YourProjectName",
        dependencies: [
            .package(url: "https://github.com/ondecentral/luciaprotocol.git", from: "1.0.0")
        ],
        targets: [
            .target(name: "YourProjectName", dependencies: ["luciaprotocol"]),
        ]

