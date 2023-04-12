const MessagesItem = (props) => {
  const { user } = props;
  const unreadMessageCount = 0;
  return (
    <>
      <li className='py-3'>
        <a href='#!' className='d-flex text-decoration-none align-items-center text-light hover-dim'>
          <div
            className='d-flex flex-row'
            style={{ width: unreadMessageCount > 0 ? '90%' : '100%' }}
          >
            <div className='me-3'>
              <img
                src={
                  user.profileImgUrl ||
                  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
                }
                alt='avatar'
                className='d-flex align-self-center rounded-circle'
                width='40'
                height='40'
              />
              <span className='badge bg-success badge-dot'></span>
            </div>
            <div className='overflow-hidden my-auto me-3'>
              <p className='fw-bold mb-0 text-truncate'>
                {user.displayName}
              </p>
              {user.status && (
                <p className='small mb-0 text-truncate'>{user.status}</p>
              )}
            </div>
          </div>
          {unreadMessageCount > 0 && (
            <div>
              <span className='badge bg-danger rounded-pill float-end'>
                {unreadMessageCount}
              </span>
            </div>
          )}
        </a>
      </li>
      <hr className='m-0 p-0' />
    </>
  );
};

const MessagesLeftbar = (props) => {
  return (
    <div className='col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 w-100'>
      <div className=''>
        <div className='input-group rounded mb-1'>
          <input
            type='search'
            className='form-control rounded'
            placeholder='Search'
            aria-label='Search'
            aria-describedby='search-addon'
          />
        </div>

        <div>
          <ul className='list-unstyled mb-0'>
            <MessagesItem
              user={{
                displayName: 'Alan',
                profileImgUrl: 'https://i.imgur.com/lgrw6WV.png',
                status: 'i have aids'
              }}
            />
            <MessagesItem
              user={{
                displayName: 'Ronpob',
                profileImgUrl: 'https://i.imgur.com/cwUFRRI.png',
                status: 'am sexually attracted to green goop blobs'
              }}
            />
            <MessagesItem user={{ displayName: 'Shohei' }} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessagesLeftbar;
