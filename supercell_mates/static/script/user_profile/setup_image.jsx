function SetupImage() {
    const [imagePreview, setImagePreview] = React.useState();
    const imageInput = React.useRef(null);

    function image() {
        return (
            <img className="m-3" src={URL.createObjectURL(imageInput.current.files[0])} style={{height: '200px'}}></img>
        )
    }

    function submitPhoto(event) {
        event.preventDefault();
        if (files.length === 0) {
            window.location.assign('/');
        } else {
            fetch('/profile/set_profile_image', postRequestContent({
                img: imageInput.current.files[0]
            }))
                .then(response => {
                    if (response.status !== 200) {
                        triggerErrorMessage();
                    } else {
                        window.location.assign('/');
                    }
                });
        }
    }

    return (
        <React.Fragment>
            <div>{imagePreview}</div>
            <form id="setup_image_form" onSubmit={submitPhoto}>
                <div className="m-3">
                    <label htmlFor="setupImage" class="form-label">Add Profile Image</label>
                    <input ref={imageInput} class="form-control" type="file" id="setupImage" name="profile_pic" accept="image/*" onChange={() => setImagePreview(image())}></input>
                </div>
                <div className="m-3">
                    <input type="submit" value="Confirm" className="btn btn-primary"></input>
                </div>
            </form>
        </React.Fragment>
    );
}

ReactDOM.render(<SetupImage />, document.querySelector("#setup_image"));