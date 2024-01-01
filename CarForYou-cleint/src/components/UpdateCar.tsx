import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById, updateCar } from "../services/CarService";
import Car from "../interfaces/Car";
import * as yup from "yup";
import { successMsg } from "../services/feedbackServicw";
import { useFormik } from "formik";



interface UpdateCarProps { }

const UpdateCar: FunctionComponent<UpdateCarProps> = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | undefined>();
  const monthNames = new Array(12).fill(0).map((x, index) => {
    return new Date(0, index).toLocaleString('default', { month: 'long' })
  }).reverse()


  useEffect(() => {
    getCarById((id) as string)
      .then((res) => setCar(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  let formik = useFormik({
    initialValues: {
      owner: car?.owner || "",
      title: car?.title || "",
      Company: car?.Company || "",
      model: car?.model || "",
      description: car?.description || "",
      engine: car?.engine || "",
      horsepower: car?.horsepower || "",
      km: car?.km || "",
      phone: car?.phone || "",
      email: car?.email || "",
      typegear: car?.typegear || "",
      image: car?.image || "",
      state: car?.state || "",
      country: car?.country || "",
      city: car?.city || "",
      street: car?.street || "",
      Hosenumber: car?.Hosenumber || 0,
      price: car?.price || "",
      Hand: car?.Hand || 0,

      date: car?.date || "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      horsepower: yup.string().required(" horse power is required"),
      engine: yup.string().required("engine and horse power is required"),
      phone: yup.string().required("Phone is required"),
      email: yup.string().required("Email is required"),
      web: yup.string(),
      image: yup.string().required("Image is required"),
      state: yup.string(),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      street: yup.string().required("Street is required"),
      date: yup.string().required("date is required"),
      Hosenumber: yup.number().required("House Number is required"),
      Hand: yup.number().required("House Number is required"),





    }),
    onSubmit: async (values: Car) => {

      updateCar(values, (id) as string)
        .then((res) => {
          navigate("/home");
          successMsg("Car updated successfully!");
        })
        .catch((err) => console.log(err));
    },

  });

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Update Car</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your business name or if you are private"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-danger">{formik.errors.title}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Company" className="form-label">
              Company
            </label>
            <textarea
              id="Company"
              name="Company"
              className="form-control"
              value={formik.values.Company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.Company && formik.errors.Company && (
              <div className="text-danger">{formik.errors.Company}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="model" className="form-label">
              model
            </label>
            <textarea
              id="model"
              name="model"
              className="form-control"
              value={formik.values.model}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.model && formik.errors.model && (
              <div className="text-danger">{formik.errors.model}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="engine" className="form-label">
              engine
            </label>
            <textarea
              id="engine"
              name="engine"
              className="form-control"
              value={formik.values.engine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.engine && formik.errors.engine && (
              <div className="text-danger">{formik.errors.engine}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="horsepower" className="form-label">
              horsepower
            </label>
            <textarea
              id="horsepower"
              name="horsepower"
              className="form-control"
              value={formik.values.horsepower}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.horsepower && formik.errors.horsepower && (
              <div className="text-danger">{formik.errors.horsepower}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="typegear" className="form-label">
              type gear
            </label>
            <input
              type="text"
              id="typegear"
              name="typegear"
              className="form-control"
              value={formik.values.typegear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.typegear && formik.errors.typegear && (
              <div className="text-danger">{formik.errors.typegear}</div>
            )}
          </div>


          <div className="mb-3">
            <label htmlFor="km" className="form-label">
              km
            </label>
            <textarea
              id="km"
              name="km"
              className="form-control"
              value={formik.values.km}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.km && formik.errors.km && (
              <div className="text-danger">{formik.errors.km}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Hand" className="form-label">
              Hand
            </label>
            <input
              type="number"
              id="Hand"
              name="Hand"
              className="form-control"
              value={formik.values.Hand || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Hand && formik.errors.Hand && (
              <div className="text-danger">{formik.errors.Hand}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>

            <select
              id="date"
              name="date"
              className="form-control"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Date</option>
              {Array.from({ length: new Date().getFullYear() - 1899 }, (_, index) => {
                const year = new Date().getFullYear() - index;
                return (
                  <optgroup key={year} label={`${year}`}>
                    {monthNames.map((name, monthIndex) => (
                      <option key={`${year}-${monthIndex + 1}`} value={`${year}-${monthIndex + 1}`}>
                        {name} - {year}
                      </option>
                    ))}
                    { }
                  </optgroup>
                );
              })}
            </select>



            {formik.touched.date && formik.errors.date && (
              <div className="text-danger">{formik.errors.date}</div>
            )}


          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="form-control"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-danger">{formik.errors.image}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor=" price" className="form-label">
              price
            </label>
            <textarea
              id=" price"
              name="price"
              className="form-control"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.price && formik.errors.price && (
              <div className="text-danger">{formik.errors.price}</div>
            )}
          </div>
          <hr />
          <hr />
          <hr />
          <h3>Contact</h3>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-danger">{formik.errors.phone}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>


          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              placeholder="You can put a link to a map of your business location"
              type="text"
              id="state"
              name="state"
              className="form-control"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state && (
              <div className="text-danger">{formik.errors.state}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="form-control"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.country && formik.errors.country && (
              <div className="text-danger">{formik.errors.country}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-danger">{formik.errors.city}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="street" className="form-label">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              className="form-control"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.street && formik.errors.street && (
              <div className="text-danger">{formik.errors.street}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Hosenumber" className="form-label">
              House Number
            </label>
            <input
              type="number"
              id="Hosenumber"
              name="Hosenumber"
              className="form-control"
              value={formik.values.Hosenumber || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Hosenumber && formik.errors.Hosenumber && (
              <div className="text-danger">{formik.errors.Hosenumber}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCar;
