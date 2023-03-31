import React from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';

const Privacy = () => {
    return (
        <Layout>
            <StyledDiv>
                <h1>Privacy Policy</h1>
                <p>Last updated: March 21, 2023</p>
                <p>
                    This privacy policy describes our policies and procedures on
                    the collection, use and disclosure of your information when
                    you use the website. By using the website, you agree to the
                    collection and use of information in accordance with this
                    privacy policy. This privacy policy has been created with
                    the help of the{' '}
                    <a
                        href="https://www.freeprivacypolicy.com/free-privacy-policy-generator/"
                        target="_blank"
                        rel="noreferrer">
                        Free Privacy Policy Generator
                    </a>
                    .
                </p>
                <h2>Login</h2>
                <p>
                    In this application the{' '}
                    <a
                        href="https://auth.projects.multimediatechnology.at/"
                        target="_blank"
                        rel="noreferrer">
                        OAUTH Login
                    </a>{' '}
                    of the University of Applied Sciences Salzburg is used. The
                    following data is transferred automatically:
                </p>
                <ul>
                    <li>Firstname</li>
                    <li>Lastname</li>
                    <li>Email</li>
                    <li>Username</li>
                    <li>Status</li>
                    <li>Studies</li>
                    <li>Department</li>
                </ul>
                <h2>Collecting your personal data</h2>
                <p>
                    While using this website, we are saving the following
                    personal data:
                </p>
                <ul>
                    <li>Firstname</li>
                    <li>Lastname</li>
                    <li>Email</li>
                    <li>Dormitory</li>
                    <li>Room Number</li>
                    <li>Study</li>
                    <li>Department</li>
                    <li>Image*</li>
                    <li>Interests*</li>
                    <li>Phone*</li>
                    <li>Instagram (Username)*</li>
                </ul>
                * optional
                <h2>Use of your personal data</h2>
                <p>
                    The Company may use Personal Data for the following
                    purposes:
                </p>
                <ul>
                    <li>
                        To manage your account: The personal data you provide
                        can give you access to different functionalities of the
                        website that are available to you as a registered user.
                    </li>
                    <li>
                        To contact You: To contact you by email regarding
                        updates or informative communications related to the
                        functionalities.
                    </li>
                </ul>
                <p>
                    We may share Your personal information in the following
                    situations:
                </p>
                <ul>
                    <li>
                        With other users: If you share personal information,
                        this information can be seen by all users.
                        Exception:Phone, email and room number will only be
                        shared with your guests.
                    </li>
                </ul>
                <h2>Delete your personal data</h2>
                <p>
                    You have the right to delete or request that we assist in
                    deleting the personal data that we have collected about you.
                </p>
                <p>
                    You may update your information at any time by signing in to
                    your account and visiting the account settings section that
                    allows you to manage your personal information.
                </p>
                <p>
                    Contact us to request an overview of your personal data or
                    delete any personal information that you have provided to
                    us.
                </p>
                <h2>Security of your personal data</h2>
                <p>
                    The security of your personal data is important to us, but
                    remember that no method of transmission over the internet,
                    or method of electronic storage is 100% secure. While we
                    strive to protect your personal data, we cannot guarantee
                    its absolute security.
                </p>
                <h2>Links to other websites</h2>
                <p>
                    Our website may contain links to other websites that are not
                    operated by us. If you click on a third party link, You will
                    be directed to that third party&apos;s site. We strongly
                    advise you to review the privacy policy of every site you
                    visit. We have no control over and assume no responsibility
                    for the content, privacy policies or practices of any third
                    party sites or services.
                </p>
                <h2>Changes to this privacy policy</h2>
                <p>
                    We may update our privacy policy from time to time. We will
                    notify you of any changes by posting the new privacy policy
                    on this page. We will let you know via email and/or a
                    prominent notice on our website, prior to the change
                    becoming effective and update the &quot;Last updated&quot;
                    date at the top of this privacy policy. You are advised to
                    review this privacy policy periodically for any changes.
                    Changes to this privacy policy are effective when they are
                    posted on this page.
                </p>
                <h2>Contact us</h2>
                <p>
                    If you have any questions about this privacy policy, you can
                    contact us:
                </p>
                <ul>
                    <li>
                        Kerstin Reichinger:
                        kreichinger.mmt-b2020@fh-salzburg.ac.at
                    </li>
                    <li>Lisa Rader: lrader.mmt-b2020@fh-salzburg.ac.at</li>
                    <li>Tanja Santner: tsantner.mmt-b2020@fh-salzburg.ac.at</li>
                    <li>
                        Alexandra Buchecker:
                        abuchecker.mma-b2020@fh-salzburg.ac.at
                    </li>
                </ul>
            </StyledDiv>
        </Layout>
    );
};

export default Privacy;

const StyledDiv = styled.div`
    max-width: 600px;
`;
