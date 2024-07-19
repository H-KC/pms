import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
{
  /* money icon */
}
import AttachMoney from "@mui/icons-material/AttachMoney";

const InfoCard = ({ data, title, payment_systems }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
        gap: 2,
      }}
    >
      <Card size="lg" variant="outlined">
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">{title}</Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
          {data.map((item, index) => (
            <ListItem key={index}>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              <Typography>{item}</Typography>
            </ListItem>
          ))}
        </List>
        <Divider inset="none" />
        <CardActions>
          
          <AttachMoney />
          {
            payment_systems.map((payment_system, index) => (
              <Button
                key={index}
                variant="text"
                color="primary"
                endIcon={<KeyboardArrowRight />}
              >
                {payment_system}
              </Button>
            ))

          }
        </CardActions>
      </Card>
    </Box>
  );
};

export default InfoCard;
