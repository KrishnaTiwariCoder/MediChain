// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    struct Record {
        string ipfsHash;
        uint256 timestamp;
        address doctor;
        bool isActive;
    }

    struct HealthTarget {
        uint256 waterIntake;     // in ml
        uint256 exerciseMinutes; // daily target in minutes
        string medicationSchedule;
        uint256 lastUpdated;
    }

    struct VitalSigns {
        uint256 bloodPressureSystolic;
        uint256 bloodPressureDiastolic;
        uint256 oxygenLevel;
        uint256 bloodSugar;
        uint256 timestamp;
    }

    mapping(address => Record[]) private patientRecords;
    mapping(address => mapping(address => bool)) private doctorAccess;
    mapping(address => HealthTarget) private healthTargets;
    mapping(address => VitalSigns[]) private patientVitals;
    mapping(address => bool) public doctors;

    event RecordAdded(address indexed patient, string ipfsHash, uint256 timestamp);
    event DoctorAccessGranted(address indexed patient, address indexed doctor);
    event DoctorAccessRevoked(address indexed patient, address indexed doctor);
    event HealthTargetUpdated(address indexed patient, uint256 timestamp);
    event VitalSignsRecorded(address indexed patient, uint256 timestamp);

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Only doctors can perform this action");
        _;
    }

    function addDoctor(address _doctor) external {
        doctors[_doctor] = true;
    }

    function addRecord(string memory _ipfsHash) external {
        Record memory newRecord = Record({
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            doctor: msg.sender,
            isActive: true
        });
        patientRecords[msg.sender].push(newRecord);
        emit RecordAdded(msg.sender, _ipfsHash, block.timestamp);
    }

    function grantDoctorAccess(address _doctor) external {
        require(!doctorAccess[msg.sender][_doctor], "Doctor already has access");
        doctorAccess[msg.sender][_doctor] = true;
        emit DoctorAccessGranted(msg.sender, _doctor);
    }

    function revokeDoctorAccess(address _doctor) external {
        require(doctorAccess[msg.sender][_doctor], "Doctor doesn't have access");
        doctorAccess[msg.sender][_doctor] = false;
        emit DoctorAccessRevoked(msg.sender, _doctor);
    }

    function setHealthTargets(
        uint256 _waterIntake,
        uint256 _exerciseMinutes,
        string memory _medicationSchedule
    ) external onlyDoctor {
        healthTargets[msg.sender] = HealthTarget({
            waterIntake: _waterIntake,
            exerciseMinutes: _exerciseMinutes,
            medicationSchedule: _medicationSchedule,
            lastUpdated: block.timestamp
        });
        emit HealthTargetUpdated(msg.sender, block.timestamp);
    }

    function recordVitalSigns(
        address _patient,
        uint256 _systolic,
        uint256 _diastolic,
        uint256 _oxygenLevel,
        uint256 _bloodSugar
    ) external {
        require(doctorAccess[_patient][msg.sender] || msg.sender == _patient, "Unauthorized");
        
        VitalSigns memory newVitals = VitalSigns({
            bloodPressureSystolic: _systolic,
            bloodPressureDiastolic: _diastolic,
            oxygenLevel: _oxygenLevel,
            bloodSugar: _bloodSugar,
            timestamp: block.timestamp
        });
        
        patientVitals[_patient].push(newVitals);
        emit VitalSignsRecorded(_patient, block.timestamp);
    }

    function getPatientRecords() external view returns (Record[] memory) {
        return patientRecords[msg.sender];
    }

    function getHealthTargets(address _patient) external view returns (HealthTarget memory) {
        require(doctorAccess[_patient][msg.sender] || msg.sender == _patient, "Unauthorized");
        return healthTargets[_patient];
    }

    function getLatestVitals(address _patient) external view returns (VitalSigns memory) {
        require(doctorAccess[_patient][msg.sender] || msg.sender == _patient, "Unauthorized");
        VitalSigns[] memory vitals = patientVitals[_patient];
        require(vitals.length > 0, "No vitals recorded");
        return vitals[vitals.length - 1];
    }
}