import ProfileContainer from "../../components/Admin/Profile/ProfileContainer/ProfileContainer";
import { withIronSessionSsr } from "iron-session/next";
import clientPromise from "../../lib/mongodb";

const Profile = ({ user }) => {
  return (
    <>
      <ProfileContainer user={user} />
    </>
  );
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

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db("darkpine");
    const collection = db.collection("users");

    // get user from db
    user = await collection.findOne({ customerId: user.id });

    return {
      props: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          customerId: user.customerId,
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

export default Profile;
