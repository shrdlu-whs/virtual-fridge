import * as React from "react";
import { useLocation } from "react-router";
import {
  Grid,
  Paper,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Formik } from "formik";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useStyles } from "./signInForm.styles";
import { ISignInForm } from "../../../interfaces/account.interface";
import RequestButton from "../../request-button/requestButton";

interface ISignInProps {
  handleValidate: (signIn: ISignInForm) => void;
  handleRedirect: (path: string) => void;
  isSubmitting: boolean;
}

const SignInForm = ({
  handleValidate,
  handleRedirect,
  isSubmitting,
}: ISignInProps) => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item sm={9} md={5} lg={4} xl={3}>
        <Paper className={classes.signInContentContainer}>
          <Typography
            className={classes.signInTitle}
            component="h1"
            variant="h5"
          >
            {t("title.signIn")}
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values: ISignInForm) => {
              handleValidate({
                username: values.username,
                password: values.password,
              });
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required(t("label.no_valid_username")),
              password: Yup.string().required(t("label.no_valid_password")),
            })}
          >
            {({
              values,
              touched,
              errors,
              dirty,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      label={t("label.username_or_Email")}
                      name="username"
                      type="text"
                      variant="standard"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={touched.username && errors.username !== undefined}
                      margin="normal"
                      fullWidth
                      required
                    />
                    <TextField
                      label={t("label.password")}
                      name="password"
                      type="password"
                      variant="standard"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={touched.password && errors.password !== undefined}
                      margin="normal"
                      fullWidth
                      required
                    />
                  </div>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          {t("body.before_forgot_password")}
                          <Link
                            component="button"
                            variant="subtitle2"
                            type="button"
                            className={classes.inlineLink}
                            onClick={() => handleRedirect("/forgotPassword")}
                          >
                            {t("action.forgot_password")}
                          </Link>
                          {t("body.after_forgot_password")}
                          <Link
                            component="button"
                            variant="subtitle2"
                            type="button"
                            className={classes.inlineLink}
                            onClick={() => handleRedirect("/register")}
                          >
                            {t("action.register")}
                          </Link>
                          {t("body.after_register")}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <RequestButton
                          variant="contained"
                          color="primary"
                          fullWidth
                          type="submit"
                          loading={isSubmitting}
                          disabled={!touched || isSubmitting || (dirty && !isValid)}
                          endIcon={<ExitToApp />}
                        >
                          {t("action.signIn")}
                        </RequestButton>
                      </Grid>
                    </Grid>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(SignInForm);
