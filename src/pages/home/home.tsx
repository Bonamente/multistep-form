import cn from 'classnames';
import Header from '../../components/header/header';
import ContactForm from '../../components/contact-form/contact-form';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={cn(styles.pageWrapper, 'container')}>
      <Header />
      <main>
        <div className={cn(styles.pageWrapper)}>
          <ContactForm />
        </div>
      </main>
    </div>
  );
};

export default Home;
