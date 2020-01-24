import React,{Component} from "react" 
import axios from "axios"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


class Optimise extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
             data:null,
             crowdPresent:null,
             crowdData:null
        }
        this.onGenerateData = this.onGenerateData.bind(this)
    }
    componentDidMount(){
        const rid=this.props.match.params.rid;
        axios.get("http://127.0.0.1:5000/route/"+rid)
        .then(res=>{
            this.setState({data:res["data"]["result"]})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    onGenerateData(){
        const rid=this.props.match.params.rid;
        this.setState({crowdPresent:true})
        axios.get("http://127.0.0.1:5000/genData/"+rid)
        .then(obj=>{
            this.setState({crowdData:obj['data']['result']})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        const {classes} = this.props;
const bull = <span className={classes.bullet}>•</span>;
        let view;
        let dataView
        if(this.state.data){
            view=<div style={{marginTop:"40px"}}>
                <div>
                    <Card className={classes.card}>
      <CardContent>
      <div className="row">
                    <div className="col-md-6">
        <Typography variant="h5" component="h2">
        Generate Dataset
        </Typography>
        <Button onClick={this.onGenerateData} size="small">Generate Crowd Data</Button>
        </div>
        <div className="col-md-6">
            {
                this.state.crowdData?<Alert severity="success">Data generated successfully!</Alert>:this.state.crowdPresent?      <Alert severity="warning">Data generation in progress!</Alert>:<Alert severity="error">No Dataset Generated!</Alert>
            }
        </div>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Run RL on this trip</Button>
      </CardActions> */}
    </Card>    
    </div>
      <div>

          {
              //lakshya area
          }
    </div>
                </div>
        }else{
            view=<div class="spinner-grow text-warning"></div>
        }
        return (
            <div>
                {view}
            </div>
        )
    }
}

export default withStyles(useStyles)(Optimise);