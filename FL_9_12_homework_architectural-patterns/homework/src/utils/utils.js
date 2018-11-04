const pattern = `
<div class="wrapper">
    <div class="input-search">
        <form class="form">
            <label>Search by name:
                <input type="text" id="searchInput" placeholder="Enter user name…">
            </label>
        </form>
    </div>
    <div class="table">
        <table class="users-info">
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Time zone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="user-data"></tbody>
        </table>
    </div>
    <div class="load-more">
        <p class="counter">Displayed <span id="display"></span> out of <span id="extracted"></span></p>
        <button id="loadMore">Load more</button>
    </div>
</div>
`;
export {pattern};
