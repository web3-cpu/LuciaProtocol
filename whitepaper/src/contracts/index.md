# Modules

- Asset Addition and Removal
- Liquidation Logic

# Approved Transactions



# Interfaces

We use a ZK Circuit Compiler


circom allows programmers to define the constraints that define the arithmetic circuit. All constraints must be quadratic of the form A*B + C = 0, where A, B and C are linear combinations of signals. circom will apply some minor transformations on the defined constraints in order to meet the format A*B + C = 0: [Reference](https://docs.circom.io/circom-language/constraint-generation/)

* Moves from one side of the equality to the other.
* Applications of commutativity of addition.
* Multiplication (or division) by constants.
