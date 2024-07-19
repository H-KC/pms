import { Container, Typography, Box, Grid, Paper, Link } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg" style={{}}>
      <Box my={4}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          color={"primary"}
          align={"center"}
        >
          <strong>About Us</strong>
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          <b>Our Mission</b>
        </Typography>
        <Typography variant="body1" paragraph>
          At PM-MANAGER, our mission is to empower teams and organizations to
          achieve their project goals efficiently and effectively. We believe in
          providing a robust and intuitive project management platform that
          caters to the diverse needs of admins, clients, and partners, ensuring
          seamless collaboration and project success.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          <b>Our Vision</b>
        </Typography>
        <Typography variant="body1" paragraph>
          Our vision is to become a leading provider of project management
          solutions, recognized for our innovative approach, user-friendly
          design, and commitment to helping businesses thrive in an
          ever-evolving digital landscape.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          <b>Who We Are</b>
        </Typography>
        <Typography variant="body1" paragraph>
          PM-MANAGER is a passionate team of developers, designers, and project
          management professionals dedicated to creating the best project
          management tools. Our expertise in the MERN stack – MongoDB,
          Express.js, React, and Node.js – allows us to deliver a powerful and
          scalable web application that meets the highest standards of
          performance and security.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          <b>What We Do</b>
        </Typography>
        <Typography variant="body1" paragraph>
          Our project management system is designed to streamline your workflow
          and enhance productivity through:
        </Typography>
        <ul>
          <li>
            User Roles: Tailored access and functionalities for Admins, Clients,
            and Partners to ensure each user can perform their tasks
            efficiently.
          </li>
          <li>
            Project Management: Comprehensive tools for creating, tracking, and
            managing projects, including timelines, budgets, and task
            assignments.
          </li>
          <li>
            Collaboration: Features that facilitate communication and
            collaboration among team members, including chat, file sharing, and
            real-time updates.
          </li>
          <li>
            Articles and Knowledge Base: An integrated system for creating and
            managing articles, helping teams document processes and share
            knowledge.
          </li>
          <li>
            Client and Partner Management: Tools to manage client relationships
            and partner collaborations, ensuring smooth project execution and
            client satisfaction.
          </li>
          <li>
            Secure Payments: A secure and reliable payment system for managing
            project finances and transactions.
          </li>
        </ul>

        <Typography variant="h4" component="h2" gutterBottom>
          <b>Our Values</b>
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>
              Innovation: We constantly seek new ways to improve our platform
              and bring the latest technological advancements to our users.
            </li>
            <li>
              User-Centric Design: Our focus is on creating a user-friendly
              interface that is both intuitive and powerful.
            </li>
            <li>
              Reliability: We prioritize the security and stability of our
              platform to ensure your projects run smoothly without
              interruptions.
            </li>
            <li>
              Collaboration: We foster a collaborative environment, both within
              our team and with our users, to drive continuous improvement and
              success.
            </li>
          </ul>
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          <b>Contact Us</b>
        </Typography>
        <Typography variant="body1" paragraph>
          We are here to support you on your project management journey. If you
          have any questions, feedback, or need assistance, please do not
          hesitate to contact us.
        </Typography>

        <Paper elevation={3} style={{ padding: "1em" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">
                <Link href="mailto:support@yourcompany.com">
                  support@yourcompany.com
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body1">+1 (234) 567-8900</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address</Typography>
              <Typography variant="body1">
                123 Project Lane, Suite 100, Tech City, TX 12345
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
