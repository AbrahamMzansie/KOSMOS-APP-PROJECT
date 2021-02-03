import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Comments from "./Comments";
const styles = {
  commentList: {
    height: "200px",
    maxHeight: "500px",
    resize: "vertical",
    overflow: "auto",
    margin: "30px",
  },
  accordion: {
    margin: "30px",
  },
};
const ScreamAccordion = ({ stream, index, classes }) => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          className={classes.accordion}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            className={classes.accordion}
            color="primary"
            variant="h5"
            className={classes.heading}
          >
            Comment Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.commentList}>
          <Comments
            stream={stream}
            index={index}
            comments={stream.comments}
          ></Comments>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default withStyles(styles)(ScreamAccordion);
