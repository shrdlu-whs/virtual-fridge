import * as React from "react";
import { useLocation } from "react-router";
import { Grid, Paper, Link, TextField, Typography } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Formik } from "formik";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useStyles } from "./forgotPasswordSubmitForm.styles";
import { IForgotPasswordSubmitForm } from "../../../interfaces/account.interface";
import RequestButton from "../../request-button/requestButton";

interface IForgotPasswordSubmitProps {
  handleValidate: (form: IForgotPasswordSubmitForm) => void;
  handleCancelSubmit: () => void;
  username: string;
  isSubmitting: boolean;
}

const ForgotPasswordSubmitForm = ({
  handleValidate,
  handleCancelSubmit,
  username,
  isSubmitting,
}: IForgotPasswordSubmitProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item sm={9} md={5} lg={4} xl={3}>
        <Paper className={classes.forgotPasswordSubmitContentContainer}>
          <Typography
            className={classes.forgotPasswordSubmitTitle}
            component="h1"
            variant="h5"
          >
            {t("title.forgot_password_submit")}
          </Typography>
          <Formik
            initialValues={{ code: "", password: "", username: username }}
            onSubmit={(values: IForgotPasswordSubmitForm) => {
              handleValidate({
                code: values.code,
                username: values.username,
                password: values.password,
              });
            }}
            onReset={() => {
              handleCancelSubmit();
            }}
            validationSchema={Yup.object().shape({
              code: Yup.number().required(t("label.no_valid_code")),
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
              handleReset,
              isValid,
            }) => {
              return (
                <form onSubmit={handleSubmit} onReset={handleReset}>
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
                      disabled
                    />
                    <TextField
                      label={t("label.code")}
                      name="code"
                      type="text"
                      variant="standard"
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.code && errors.code}
                      error={touched.code && errors.code !== undefined}
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
                      <Grid item xs={6}>
                        <RequestButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={isSubmitting}
                          disabled={
                            !touched || isSubmitting || (dirty && !isValid)
                          }
                          endIcon={<ExitToApp />}
                          fullWidth
                        >
                          {t("action.confirm")}
                        </RequestButton>
                      </Grid>
                      <Grid item xs={6}>
                        <RequestButton
                          variant="contained"
                          color="primary"
                          type="reset"
                          loading={isSubmitting}
                          disabled={
                            !touched || isSubmitting || (dirty && !isValid)
                          }
                          endIcon={<ExitToApp />}
                          fullWidth
                        >
                          {t("action.cancel")}
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

export default observer(ForgotPasswordSubmitForm);
