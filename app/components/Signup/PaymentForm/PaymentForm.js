import styles from './PaymentForm.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './Payment'

const stripeLoader = loadStripe('pk_test_51L17SXCujKXJKQzqV23JMtqjDNpoZ4AgslMllIRIQwzw6BPm2oiiMs6H68n35aVCJu5uZftSXcKm6cg1CEjrIc2C00t9C9jAkW')

const PaymentForm = ({accountInfo}) => {


  const options = {
    clientSecret: accountInfo.clientSecret
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.title}>Payment Information</p>
          <Elements stripe={stripeLoader} options={options}>
          <Payment accountInfo={accountInfo} />
        </Elements>
      </div>
    </div>
  )
}

export default PaymentForm;