import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiActions, register } from "../../_actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAlert } from "react-alert";
import { Link, Redirect } from "react-router-dom";
import { MenuItem } from "@material-ui/core";

import { login } from "../../_actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const alert = useAlert();

  const { languagesActions, coursesActions } = apiActions;

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    language: "",
    course: "",
  });
  const languages = useSelector((state) => state.languages.items);
  const courses = useSelector((state) => state.courses.items);
  const [submitted, setSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const registering = useSelector((state) => state.authentication.registering);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  React.useEffect(() => {
    if (languages.length === 0) dispatch(languagesActions.getAll());
    if (courses.length === 0) dispatch(coursesActions.getAll());
  }, [dispatch, languagesActions, languages, coursesActions, courses]);

  // É para executar somente no primeiro render
  // Como um ComponentDidMount
  React.useEffect(() => {
    if (user?.user) setRedirect(true);
    // eslint-disable-next-line
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setBlocked(true);
    alert.info("Creating your account. Hold tight!");

    if (
      inputs.email &&
      inputs.password &&
      inputs.username &&
      inputs.language &&
      inputs.course
    ) {
      dispatch(register(inputs))
        .then(() => {
          alert.success("Account succesfully created! Logging you in...");
          dispatch(login(inputs.email, inputs.password));
          setTimeout(() => {
            setRedirect(true);
          }, 3000);
        })
        .catch((error) => {
          alert.error(error);
          setBlocked(false);
        });
    } else {
      alert.error(
        "Required fields missing! Please, check your inputs and try again!"
      );
      setBlocked(false);
    }
  }

  return (
    <Container>
      {/*<Container maxWidthXs="xs">*/}
      {redirect && user?.user && <Redirect to={"/userspace"} />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
                disabled={blocked}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
                disabled={blocked}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                className={submitted && !inputs.username ? "danger" : ""}
                onChange={handleChange}
                disabled={blocked}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                className={submitted && !inputs.email ? "danger" : ""}
                onChange={handleChange}
                disabled={blocked}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className={submitted && !inputs.password ? "danger" : ""}
                onChange={handleChange}
                disabled={blocked}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="language"
                label="Language"
                type="language"
                id="language"
                className={submitted && !inputs.language ? "danger" : ""}
                onChange={handleChange}
                select
                disabled={blocked}
              >
                {languages.map((language, index) => (
                  <MenuItem value={language.id} key={index}>
                    {language.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="course"
                label="Course"
                type="course"
                id="course"
                className={submitted && !inputs.course ? "danger" : ""}
                onChange={handleChange}
                select
                disabled={blocked}
              >
                {courses.map((course, index) => (
                  <MenuItem value={course.id} key={index}>
                    {course.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={blocked}
          >
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
