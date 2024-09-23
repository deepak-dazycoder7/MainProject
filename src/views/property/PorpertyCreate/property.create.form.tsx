import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { useAppSelector, useAppDispatch } from '@/store';
import { createPropertyApi } from '../property.service';
import { PropertyResponse } from '../property.type';
import { useState } from 'react';
import { Accordion } from 'flowbite-react';


const PropertyCreateForm = () => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = React.useState<string | null>(null);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);


    // Access the user state from the Redux store
    const user = useAppSelector((state) => state.user);


    // Validation schema
    const validationSchema = Yup.object().shape({
        property_name: Yup.string().required('Please enter property name'),
        description: Yup.string().required('Please enter property description'),
        price: Yup.number().required('Please enter property price').min(0, 'Price cannot be negative'),
        location: Yup.string().required('Please enter property location'),
        category: Yup.string().required('Please select property category'),
        type: Yup.string().required('Please select property type'),
        division: Yup.string().required('Please select property division'),
        isAvailable: Yup.boolean().required('Please specify availability'),
        amenities: Yup.string().required('Please enter amenities separated by commas'),
        availableFrom: Yup.date().required('Please select the available from date'),
        availableTo: Yup.date().required('Please select the available to date'),
        street: Yup.string().required('Please enter the street address'),
        city: Yup.string().required('Please enter the city'),
        state: Yup.string().required('Please enter the state'),
        zipCode: Yup.string().required('Please enter the zip code'),
        country: Yup.string().required('Please enter the country'),
    });

    //role check for authorization
    if (user?.role !== 'admin' && user?.role !== 'manager') {
        return <Alert type="danger">You are not authorized to create properties.</Alert>;
    }

    // Create Property Function
    const createProperty = async (values: PropertyResponse) => {
        try {
            const response = await createPropertyApi(values); // API call for creating property

            if (response.status === 200 && !response.error) {
                setMessage(response.message); // Set success message
                return {
                    status: response.status,
                    message: response.message,
                };
            } else {
                // Handle backend error message
                setMessage(response.message || 'An error occurred!');
                return {
                    status: response.status,
                    message: response.message || 'An error occurred!',
                };
            }
        } catch (errors: any) {
            const errorMessage = errors?.response?.data?.message || errors.toString();
            setMessage(errorMessage);
            return {
                status: errors?.response?.status,
                message: errorMessage,
            };
        }
    };

    // Handle Form Submission
    const handleSubmit = async (values: PropertyResponse) => {
        setSubmitting(true);

        const result = await createProperty(values);

        if (result) {
            setMessage(result.message);
        }

        setSubmitting(false);
    };


    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg min-w-full">
            {message && (
                <Alert
                    type={message.startsWith('Property created successfully!') ? 'success' : 'danger'}
                >
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    property_name: '',
                    description: '',
                    price: '',
                    location: '',
                    category: '',
                    type: '',
                    division: '',
                    isAvailable: true,
                    amenities: '',
                    availableFrom: '',
                    availableTo: '',
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="space-y-6">

                        <Accordion collapseAll>
                            <Accordion.Panel>
                                <Accordion.Title><span className='block text-indigo-700 text-base'> Fill Property Details</span></Accordion.Title>
                                <Accordion.Content>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Property Name */}
                                        <div>
                                            <label className="block text-gray-700 font-medium">Property Name</label>
                                            <Field
                                                name="property_name"
                                                component={Input}
                                                placeholder="Property Name"
                                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.property_name && touched.property_name && (
                                                <div className="text-red-500 text-sm mt-1">{errors.property_name}</div>
                                            )}
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <label className="block text-gray-700 font-medium">Price</label>
                                            <Field
                                                name="price"
                                                type="number"
                                                placeholder="Price"
                                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.price && touched.price && (
                                                <div className="text-red-500 text-sm mt-1">{errors.price}</div>
                                            )}
                                        </div>

                                        {/* Location */}
                                        <div>
                                            <label className="block text-gray-700 font-medium">Location</label>
                                            <Field
                                                name="location"
                                                placeholder="Location"
                                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.location && touched.location && (
                                                <div className="text-red-500 text-sm mt-1">{errors.location}</div>
                                            )}
                                        </div>

                                        {/* Availability */}
                                        <div>
                                            <label className="block text-gray-700 font-medium">Availability</label>
                                            <Field
                                                as="select"
                                                name="isAvailable"
                                                className={`mt-1 block w-full p-2 bg-gray-50 border ${errors.isAvailable && touched.isAvailable
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                            >
                                                <option value={1}>Available</option>
                                                <option value={0}>Not Available</option>
                                            </Field>
                                            {errors.isAvailable && touched.isAvailable && (
                                                <div className="text-red-500 text-sm mt-1">{errors.isAvailable}</div>
                                            )}
                                        </div>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>
                                <span className='block text-indigo-700 text-base'>Select Property Type/Category</span>
                                </Accordion.Title>
                                <Accordion.Content>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        {/* Existing dropdowns */}
                                        <div>
                                            <label className="block text-gray-700">Property Category</label>
                                            <Field
                                                as="select"
                                                name="category"
                                                className={`mt-1 block w-full p-2 bg-gray-50 border ${errors.category && touched.category
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Apartment">Apartment</option>
                                                <option value="House">House</option>
                                                <option value="Office">Office</option>
                                                <option value="Shop">Shop</option>
                                            </Field>
                                            {errors.category && touched.category && (
                                                <div className="text-red-500 text-sm mt-1">{errors.category}</div>
                                            )}
                                        </div>

                                        {/* Property Type */}
                                        <div>
                                            <label className="block text-gray-700">Property Type</label>
                                            <Field
                                                as="select"
                                                name="type"
                                                className={`mt-1 block w-full p-2 bg-gray-50 border ${errors.type && touched.type ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Residential">Residential</option>
                                                <option value="Commercial">Commercial</option>
                                                <option value="Industrial">Industrial</option>
                                                <option value="Land">Land</option>
                                            </Field>
                                            {errors.type && touched.type && (
                                                <div className="text-red-500 text-sm mt-1">{errors.type}</div>
                                            )}
                                        </div>

                                        {/* Property Division */}
                                        <div>
                                            <label className="block text-gray-700">Property Division</label>
                                            <Field
                                                as="select"
                                                name="division"
                                                className={`mt-1 block w-full p-2 bg-gray-50 border ${errors.division && touched.division
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                            >
                                                <option value="">Select Division</option>
                                                <option value="East">Rent</option>
                                                <option value="West">Sell</option>
                                                <option value="North">Rent</option>
                                            </Field>
                                            {errors.division && touched.division && (
                                                <div className="text-red-500 text-sm mt-1">{errors.division}</div>
                                            )}
                                        </div>
                                        {/* Amenities */}
                                        <div>
                                            <label className="block text-gray-700">Amenities</label>
                                            <Field
                                                name="amenities"
                                                placeholder="Comma-separated list of amenities"
                                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.amenities && touched.amenities && (
                                                <div className="text-red-500 text-sm mt-1">{errors.amenities}</div>
                                            )}
                                        </div>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>
                                    <span className='block text-indigo-700 text-base'>Fill required property address</span>
                                </Accordion.Title>
                                <Accordion.Content>
                                    {/* Address Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        <div>
                                            <label className="block text-gray-700">City</label>
                                            <Field
                                                name="city"
                                                placeholder="City"
                                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.city && touched.city && (
                                                <div className="text-red-500 text-sm mt-1">{errors.city}</div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">State</label>
                                            <Field
                                                name="state"
                                                placeholder="State"
                                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.state && touched.state && (
                                                <div className="text-red-500 text-sm mt-1">{errors.state}</div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">Zip Code</label>
                                            <Field
                                                name="zipCode"
                                                placeholder="Zip Code"
                                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.zipCode && touched.zipCode && (
                                                <div className="text-red-500 text-sm mt-1">{errors.zipCode}</div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">Country</label>
                                            <Field
                                                name="country"
                                                placeholder="Country"
                                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {errors.country && touched.country && (
                                                <div className="text-red-500 text-sm mt-1">{errors.country}</div>
                                            )}
                                        </div>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Panel>
                        </Accordion>


                        {/* Description */}
                        <div>
                            <label className="block text-gray-700">Description</label>
                            <Field
                                name="description"
                                as="textarea"
                                placeholder="Property Description"
                                rows="4"
                                className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.description && touched.description && (
                                <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                            )}
                        </div>
                        {/* Available From and To */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700">Available From</label>
                                <Field
                                    name="availableFrom"
                                    type="date"
                                    className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.availableFrom && touched.availableFrom && (
                                    <div className="text-red-500 text-sm mt-1">{errors.availableFrom}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700">Available To</label>
                                <Field
                                    name="availableTo"
                                    type="date"
                                    className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.availableTo && touched.availableTo && (
                                    <div className="text-red-500 text-sm mt-1">{errors.availableTo}</div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-right flex justify-center">
                            <Button
                                type="submit"
                                className="bg-indigo-700 text-white rounded-md shadow hover:bg-indigo-500 focus:ring-indigo-400"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Create Property'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PropertyCreateForm;
