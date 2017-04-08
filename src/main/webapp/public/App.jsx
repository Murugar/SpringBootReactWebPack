import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends React.Component {
    constructor( props ) {
        super( props );
        this.deleteStudent = this.deleteStudent.bind( this );
        this.createStudent = this.createStudent.bind( this );
        this.state = {
            students: [],
        };
    }

    componentDidMount() {
        this.loadStudentsFromServer();
    }

    // Load students from database
    loadStudentsFromServer() {
        fetch( 'http://localhost:8080/api/students' )
            .then(( response ) => response.json() )
            .then(( responseData ) => {
                this.setState( {
                    students: responseData._embedded.students,
                });
            });
    }

    // Delete student
    deleteStudent( student ) {
        fetch( student._links.self.href,
            { method: 'DELETE', })
            .then(
            res => this.loadStudentsFromServer()
            )
            .catch( err => cosole.error( err ) )
    }

    // Create new student
    createStudent( student ) {
        fetch( 'http://localhost:8080/api/students',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( student )
            })
            .then(
            res => this.loadStudentsFromServer()
            )
            .catch( err => cosole.error( err ) )
    }

    render() {
        return (

            <div>
                <div>
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">Spring Boot React</a>
                            </div>
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#">Home</a></li>

                            </ul>
                        </div>
                    </nav>
                </div>


                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3>Student Info</h3>
                        </div>
                        <div className="panel-body">
                            <div>
                                <StudentForm createStudent={this.createStudent}/>
                                <StudentTable deleteStudent={this.deleteStudent} students={this.state.students}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class StudentTable extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        var students = this.props.students.map( student =>
            <Student key={student._links.self.href} student={student} deleteStudent={this.props.deleteStudent}/>
        );

        return (

            <div className="panel panel-primary">
                <div className="panel-heading"><h3>Students</h3></div>
                <div className="panel-body">
                    <div>
                        <table className="table table-bordered">
                            <thead>
                                <tr className="info">
                                    <th>Firstname</th><th>Lastname</th><th>Email</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{students}</tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

class Student extends React.Component {
    constructor( props ) {
        super( props );
        this.deleteStudent = this.deleteStudent.bind( this );
    }

    deleteStudent() {
        this.props.deleteStudent( this.props.student );
    }

    render() {
        return (
            <tr className="success">
                <td>{this.props.student.firstname}</td>
                <td>{this.props.student.lastname}</td>
                <td>{this.props.student.email}</td>
                <td>
                    <button className="btn btn-danger btn-xs" onClick={this.deleteStudent}>Delete</button>
                </td>
            </tr>
        );
    }
}

class StudentForm extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { firstname: '', lastname: '', email: '' };
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange( event ) {
        console.log( "NAME: " + event.target.name + " VALUE: " + event.target.value )
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    handleSubmit( event ) {
        event.preventDefault();
        console.log( "Firstname: " + this.state.firstname );
        var newStudent = { firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email };
        this.props.createStudent( newStudent );
        
    }

    render() {
        return (
            <div className="panel panel-success">
                <div className="panel-heading"><h4>Create Student</h4></div>
                <div className="panel-body">
                    <form className="form">
                        <div className="form-group">
                            <label for="firstname">First Name: </label>
                            <input type="text" placeholder="Firstname" className="form-control"
                                name="firstname" id="firstname" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="lastname">Last Name: </label>
                            <input type="text" placeholder="Lastname" className="form-control"
                                name="lastname"  id="lastname" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="email">Email: </label>
                            <input type="text" placeholder="Email" className="form-control"
                                name="email" id="email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );