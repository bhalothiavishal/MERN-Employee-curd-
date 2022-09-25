import React, { useState, useEffect } from 'react';
import { ErrorMessage, useForm, } from 'react-hook-form';
import { useParams, useNavigate } from "react-router-dom";
import Helper from './constants/helper';
import apiUrl from './constants/apiPath';
import { Button, Card, CardBody, CardHeader, CardTitle, CardFooter, FormGroup, Label, Col, Row } from 'reactstrap';
import _ from 'lodash';
import DatePicker from 'react-date-picker';
const Header = React.lazy(() => import('../DefaultLayout/Header'));

const AddEmployee = (props) => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [profilePic, setProfilePic] = useState('');
    const [preview, setProfilePicPreview] = useState('');
    const [dob, setDob] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async data => {
        setLoading(true);
        let formData = new FormData();
        let postJson = { name: data.name.trim(), dob: dob, email: data.email, age: data.age, address: data.address };
        formData.append('data', JSON.stringify(postJson));
        formData.append('profile_pic', profilePic);
        let path = apiUrl.add_employee;
        const fr = await Helper.formPost(formData, path);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.success) {
                setLoading(false);
                props.history.push('/users');
                alert.success(res.msg);
            } else {
                alert.error(res.msg);
                setLoading(false);
            }
        } else {

            alert.error(res.error);
            setLoading(false);
        }
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePicPreview(URL.createObjectURL(event.target.files[0]));
            setProfilePic(event.target.files[0]);
        }
    }
    const handleDob = (date) => {
        let newDate = date ? date : new Date();
        setDob(newDate);
    };

    useEffect(() => {
    }, []);


    return (
        <div className="container-full">
            <Header title="Orders Page" />
            <div className="row mt-3">
                <div className="col-md-9">
                    <React.Fragment>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <Card >
                                <CardHeader>
                                    <CardTitle className="text-info"><h4>Add Employee</h4></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label className={'col-md-2 pull-left mt-2'}>Name</Label>
                                                <input type="text" name="name" placeholder="Name" autoComplete="off"
                                                    className="form-control col-md-8" {...register('name', { required: true, pattern: /^[A-Za-z]+$/i })} />
                                                {errors.name && <p className="text-danger marginmessage">Name is required</p>}
                                            </FormGroup>
                                        </Col>
                                        <FormGroup>
                                            <Label className={'col-md-2 pull-left mt-2'}>Email</Label>
                                            <input type="text" name="email" className="form-control  col-md-8" placeholder="Email"
                                                {...register('email', {
                                                    required: 'Email is Required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "invalid email address"
                                                    }
                                                })} />
                                            {errors.email && <p className="text-danger marginmessage">Email is required</p>}
                                        </FormGroup>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label className={'col-md-2 pull-left mt-2'}>Age</Label>
                                                <input type="number" name="age" placeholder="Age" autoComplete="off"
                                                    className="form-control col-md-8" {...register('age', { required: true, pattern: /^[0-9]+$/i })} />
                                                {errors.name && <p className="text-danger marginmessage">Age is required</p>}
                                            </FormGroup>
                                        </Col>
                                        <FormGroup>
                                            <Label className={'col-md-2 pull-left mt-2'}>Date of birth</Label>
                                            <div className={"pull-left col-md-8 p-0 mb-3"}>
                                                <DatePicker value={dob === '' ? null : new Date(dob)} className="form-control" placeholderText=" Date of Birth"
                                                    dateFormat="dd/MM/yyyy"
                                                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                                                    onChange={handleDob}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                            </div>
                                        </FormGroup>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label className={'col-md-2 pull-left mt-2'}>Address</Label>
                                                <textarea name="address" placeholder="Address..." autoComplete="off" {...register('address', {})} className="form-control col-md-8">

                                                </textarea>
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label className={'col-md-2 pull-left mt-2'}>Profile Pic</Label>
                                                <input type="file" onChange={onImageChange} name="profile_pic" className="form-control  col-md-8" autoComplete="off" placeholder="Pic" />

                                                <img id="target" className={'mt-3 rounded'} height={200} src={preview} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button className={'ml-2'} type="submit" color="primary">Submit {loading === true ? <i className="fa fa-spinner fa-pulse fa-fw ml-1"></i> : <i className="fa fa-arrow-circle-right fa-lg" aria-hidden="true"></i>}</Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
