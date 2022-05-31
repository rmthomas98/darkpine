import SettingsContainer from "../../components/Admin/Settings/SettingsContainer/SettingsContainer";
import { withIronSessionSsr } from "iron-session/next";
import clientPromise from "../../lib/mongodb";

const Settings = ({ user }) => {
  return <SettingsContainer user={user} />;
};

export const getServerSideProps = withIronSessionSsr(
  async ({ req }) => {
    let user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    user = await collection.findOne({ customerId: user.id });

    return {
      props: {
        user: {
          customerId: user.customerId,
          subscriptionId: user.subscriptionId,
          cancelAtPeriodEnd: user.cancelAtPeriodEnd,
          plan: user.plan,
          paymentStatus: user.paymentStatus,
          cardDetails: user.cardDetails,
          nextInvoice: user.nextInvoice,
          invoices: user.invoices,
        },
      },
    };
  },
  {
    cookieName: "user",
    password: process.env.IRON_SESSION_PASSWORD,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);

export default Settings;
