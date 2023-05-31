function Buttons() {
    const [friendDeleted, setFriendDeleted] = React.useState(false);

    function deleteFriend() {
        fetch('/user/delete_friend', postRequestContent({
            username: document.querySelector("#profile-id").innerHTML.slice(1)
        }))
            .then(response => {
                if (response.status === 200) {
                    setFriendDeleted(true);
                } else {
                    triggerErrorMessage();
                }
            });
    }

    if (!friendDeleted) {
        return (
            <React.Fragment>
                <button type="button" class="btn btn-outline-primary">Message</button>
                <button id="delete-friend-button" class='btn btn-outline-danger' type="button" data-bs-toggle="modal" data-bs-target="#delete-friend-message">Unfriend</button>
                <div class="modal fade" id="delete-friend-message" tabindex="-1" aria-labelledby="deleteFriendLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="deleteFriendLabel">Message</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Are you sure to delete this user from your friend list?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={deleteFriend}>Yes</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <div className="no-longer-friend-icon">
                    <img src="/static/media/cross-icon.png" />
                </div>
                <div className="no-longer-friend-message text-danger">No longer friend</div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Buttons />, document.querySelector("#buttons"));