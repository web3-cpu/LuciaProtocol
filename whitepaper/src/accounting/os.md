# 2A. OS

Our operating system is based in JS. We use snarkjs a JavaScript and Pure Web Assembly implementation of zkSNARK and PLONK schemes.

Installation `npm install -g snarkjs@latest` which means that it is a global library with a command line interface. Snark.js can also be used in the browser by loading `snarkjs.min.js`.



## Dictionary

> Plonk   
> PlonK is a universal preprocessing general-purpose zk-SNARK construction. It's a proving scheme with a preprocessing phase that can be updated, and has a short and constant verification time. On the downside, PlonK proofs are bigger and slower to generate compared to Groth16.
