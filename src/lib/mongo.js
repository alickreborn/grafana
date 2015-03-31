/**
 * Created by thomas on 15/3/24.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://mongodedb.chinacloudapp.cn:27017/meleors');

var DepartmentSchema = new Schema({
    name: String
    , services: Array
});

var ServiceSchema = new Schema({
    department: { type: ObjectId, ref: 'Department' }
    , name: String
    , env: String // prod or testing or dev or staging
    , modules: Array
});

ServiceSchema.refs = ['department'];


var EmployeeSchema = new Schema({
    name: String
    , position: String
    , email: String
    , phone: String
});

var MachineSchema = new Schema({
    ip: String
    , room: String // yun gu, aws, azure.
    , public_ip: String
    // , mac: String
    , serial_number: String
    , cabinet_number: String


});

var ModuleSchema = new Schema({
    service: { type: ObjectId, ref: 'Service' }
    , name: String
    , contacts: [{ type: ObjectId, ref: 'Employee' }]
    , machines: [{ type: ObjectId, ref: 'Machine' }]
});

ModuleSchema.refs = ['service', 'contacts', 'machines'];

exports.Department = mongoose.model('Department', DepartmentSchema);
exports.Service = mongoose.model('Service', ServiceSchema);
exports.Module = mongoose.model('Module', ModuleSchema);
exports.Employee = mongoose.model('Employee', EmployeeSchema);
exports.Machine = mongoose.model('Machine', MachineSchema);