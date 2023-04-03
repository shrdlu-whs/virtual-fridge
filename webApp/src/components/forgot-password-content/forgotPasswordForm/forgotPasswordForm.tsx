import * as React from "react";
import { useLocation } from "react-router";
import { Grid, Paper, Link, TextField, Typography } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useStyles } from "./forgotPasswordForm.styles";
import { IForgotPasswordForm } from "../../../interfaces/account.interface";
import RequestButton from "../../request-button/requestButton";

interface IForgotPasswordFormProps {
  handleValidate: (form :IForgotPasswordForm) => void;
  isSubmitting: boolean;
}

const ForgotPasswordForm = ({
  handleValidate,
  isSubmitting,
}: IForgotPasswordFormProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item sm={9} md={5} lg={4} xl={3}>
        <Paper className={classes.forgotPasswordContentContainer}>
          <Typography
            className={classes.forgotPasswordTitle}
            component="h1"
            variant="h5"
          >
            {t("title.forgot_password")}
          </Typography>
          <Formik
            initialValues={{ username: "" }}
            onSubmit={(values: IForgotPasswordForm) => {
              handleValidate({ username: values.username});
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required(t("label.no_valid_username")),
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
                          disabled={
                            !touched || isSubmitting || (dirty && !isValid)
                          }
                          endIcon={<ExitToApp />}
                        >
                          {t("action.confirm")}
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

export default ForgotPasswordForm;
