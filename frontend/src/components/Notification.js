import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//material ui

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Notifications from "@material-ui/icons/Notifications";

const styles = {
  paper: {
    padding: 20,
  },
  badge: {
    backgroundColor: "#dc004e",
    position: "relative",
    top: "-15px",
    left: "1px",
  },
  notification: {},
  MenuItem: {
    color: "black",
    display: "block",
    flex: "1",
  },
  icon: {
    display: "flex",
    fontSize: "12px",
    fontWeight: "300",
  },
  name: {
    fontSize: "360px",
  },
};
dayjs.extend(relativeTime);
const Notification = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails; 

  const showPostHandler = (postId)=>{    

  }
  return (
    <div>
      <Tooltip title="New Notification" placement="top">
        <IconButton
          color="inherit"
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Notifications></Notifications>
          {user && user.notifications ? (
            <>
              <span className={classes.badge}>
                {" "}
                <Badge
                  badgeContent={user.notifications.length}
                  color="secondary"
                ></Badge>
              </span>
            </>
          ) : null}
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "auto",
          },
        }}
      >
        {user &&
          user.notifications &&
          user.notifications.map((notify) => (
            <MenuItem
              key={notify._id}
              onClick={handleClose}
              className={classes.MenuItem}
            >
              <div className={classes.icon}>
                {notify.type === "Comment" && <ChatIcon></ChatIcon>}
                {notify.type === "unlike" && <ThumbDownIcon></ThumbDownIcon>}
                {notify.type === "like" && <ThumbUpAltIcon></ThumbUpAltIcon>}
                <div className="name">
                  <strong>{notify.sender.nameHandler}&nbsp;</strong>
                  {notify.type === "Comment" && (
                    <span>commented on your post</span>
                  )}
                  {notify.type === "unlike" && (
                    <span>unlike your post</span>
                  )}
                  {notify.type === "like" && (
                    <span>like your post</span>
                  )}
                </div>
              </div>
              <Typography variant="body2" color="textSecondary">
                {dayjs(notify.createdAt).fromNow()}
              </Typography>
              <div className={classes.notification}>
                <Button
                onClick={()=>showPostHandler(notify._id)}
                  className={classes.button}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  View post
                </Button>
                <hr />
              </div>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(Notification);
