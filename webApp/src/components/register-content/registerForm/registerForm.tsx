import * as React from "react";
import { useLocation } from "react-router";
import { Grid, Paper, Link, TextField, Typography } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Formik } from "formik";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useStyles } from "./registerForm.styles";
import { IRegisterForm } from "../../../interfaces/account.interface";
import RequestButton from "../../request-button/requestButton";

interface IRegisterProps {
  handleValidate: (register: IRegisterForm) => void;
  isSubmitting: boolean;
}

const RegisterForm = ({
  handleValidate,
  isSubmitting,
}: IRegisterProps) => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item sm={9} md={5} lg={4} xl={3}>
        <Paper className={classes.registerContentContainer}>
          <Typography
            className={classes.registerTitle}
            component="h1"
            variant="h5"
          >
            {t("title.register")}
          </Typography>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            onSubmit={(values: IRegisterForm) => {
              handleValidate({
                username: values.username,
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
              });
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required(t("label.no_valid_username")),
              email: Yup.string().email().required(t("label.no_valid_email_info")),
              password: Yup.string()
                .required(t("label.no_valid_password"))
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  t("label.no_valid_password_info")
                ),
              passwordConfirm: Yup.string().oneOf(
                [Yup.ref("password"), null],
                t("label.no_valid_confirm_password_info")
              ),
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
              isValid,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      label={t("label.username")}
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
                      label={t("label.email")}
                      name="email"
                      type="text"
                      variant="standard"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.email && errors.email}
                      error={touched.email && errors.email !== undefined}
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
                     <TextField
                      label={t("label.confirm_password")}
                      name="passwordConfirm"
                      type="password"
                      variant="standard"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.passwordConfirm && errors.passwordConfirm}
                      error={touched.passwordConfirm && errors.passwordConfirm !== undefined}
                      margin="normal"
                      fullWidth
                      required
                    />
                  </div>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <RequestButton
                          variant="contained"
                          color="primary"
                          fullWidth
                          type="submit"
                          loading={isSubmitting}
                          disabled={!touched || isSubmitting || (dirty && !isValid)}
                          endIcon={<VpnKeyIcon />}
                        >
                          {t("action.register")}
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

export default observer(RegisterForm);
