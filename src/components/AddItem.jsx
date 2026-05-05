import Navbar from "./Navbar";

const AddItem = () => {
    return (
        <div>
            <Navbar/>
            <div className="row justify-content-center">
                <div className="col-md-6 card shadow mt-5">
                    <h2>Add Item</h2>
                    <form>
                       <input type="text" placeholder="Enter Item Name" className="form-control" />
                       <br />
                       <input type="text" placeholder="Enter Item Description" className="form-control" />
                        <br />
                       <input type="number" placeholder="Enter Item Price" className="form-control" />
                        <br />
                        <button type="submit" className="btn btn-primary mb-3">Add Item</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddItem;