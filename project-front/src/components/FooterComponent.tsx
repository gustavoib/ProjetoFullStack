import styles from './Footer.module.css';

const FooterComponent = () => {
  return (
      <footer className={styles.footer}>
        <table>
          <tbody>
            <tr>
              <td>
                <p> DoNotes @2023</p>
              </td>
              <td>
                <p>github.com/gustavoib</p>
              </td>
            </tr>
          </tbody>
        </table>
      </footer>
  );
}

export default FooterComponent;
