import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSubcategory, getSubcategory } from "../../../functions/subcategory";
import CategoryForm from "../../../components/forms/CategoryForm";


const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [parent, setParent] = useState("");

  useEffect(() => {
    // Need to fetch the categories
    // User might want to pick a different category
    loadCategories();
    loadSubcategory();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  // Load the subcategory to be updated
  const loadSubcategory = () =>
  // Get single subcategory
    getSubcategory(match.params.slug).then((s) => {
      // Populate subcategory name in state
      setName(s.data.name);
      // Populate subcategory's parent in state
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSubcategory(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`Subcategory "${res.data.name}" updated successfully`);
        // Redirect user to
        history.push("/admin/subcategory");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update sub category</h4>
          )}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select a category</option>
              {/* Prepopulate the selected parent category
              c._id === parent means:
              if the category id (ObjectId) of any category we are mapping over equals to parent
              which is a property of type objectId in subcategory model (this objectId is the same as category objectId),
              then display that category as default in select */}
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
