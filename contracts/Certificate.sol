// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string cert_name;
        string cert_type;
        string org_address;
    }

    struct Cert_Ins {
        string cert_name;
        string cert_type;
        string stu_address;
    }

    struct User {
        string name;
        string role;
    }

    mapping(string => User) public users;
    mapping(string => Cert[]) public certs;
    mapping(string => Cert_Ins[]) public cert_ins;

    function doesUserExists(string memory account) public view returns (bool) {
        if (
            keccak256(abi.encodePacked(users[account].name)) ==
            keccak256(abi.encodePacked(""))
        ) return false;
        return true;
    }

    function addUser(
        string memory account,
        string memory name,
        string memory role
    ) public returns (bool) {
        if (!doesUserExists(account)) {
            users[account] = User(name, role);
            return true;
        } else {
            return false;
        }
    }

    function getUser(
        string memory account
    ) public view returns (string memory, string memory) {
        User memory user = users[account];
        return (user.name, user.role);
    }

    function generateCertificate(
        string memory org_account,
        string memory stu_account,
        string memory cert_name,
        string memory cert_type
    ) public returns (bool) {
        certs[stu_account].push(Cert(cert_name, cert_type, org_account));
        cert_ins[org_account].push(Cert_Ins(cert_name, cert_type, stu_account));
        return true;
    }

    function getCertificates(
        string memory org_account,
        string memory stu_account
    )
        public
        view
        returns (
            bool,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Cert[] memory c;
        c = certs[stu_account];
        for (uint256 i = 0; i < c.length; i++) {
            if (
                keccak256(abi.encodePacked(c[i].org_address)) ==
                keccak256(abi.encodePacked(org_account))
            )
                return (
                    true,
                    org_account,
                    stu_account,
                    c[i].cert_name,
                    c[i].cert_type
                );
        }
        return (true, org_account, stu_account, "", "");
    }

    function getCertificates_Student(
        string memory stu_account
    ) public view returns (Cert[] memory) {
        return certs[stu_account];
    }

    function getCertificates_Organisation(
        string memory org_account
    ) public view returns (Cert_Ins[] memory) {
        return cert_ins[org_account];
    }
}
