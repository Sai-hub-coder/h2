import React from 'react'
import { css } from '@emotion/core'
import {
  Button,
  Dialog,
  DialogTitle,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  useOpener,
} from '@fs/zion-ui'
import { ViewerContrastMore, SocialLike, MediaFastForward } from '@fs/zion-icon'
import axios from '@fs/zion-axios'

// Hook for fetching a users portrait
const usePersonPortrait = personId => {
  const reducer = (state, { type, response }) => {
    switch (type) {
      case 'FETCHING':
        return { ...state, status: 'FETCHING' }
      case 'SUCCESS':
        return { ...state, status: 'SUCCESS', portraitUrl: response.data.thumbSquareUrl }
      case 'ERROR':
        return { ...state, status: 'ERROR', response }
      default:
        return state
    }
  }
  const [state, dispatch] = React.useReducer(reducer, { status: null, response: null })

  React.useEffect(() => {
    axios
      .get(`/service/memories/tree/persons/${personId}/portraits/CURRENT`)
      .then(response => dispatch({ type: 'SUCCESS', response }))
      .catch(response => dispatch({ type: 'ERROR', response }))
  }, [personId])

  return [state]
}

// Hook for fetchting a users details
const usePersonDetails = personId => {
  const reducer = (state, { type, response }) => {
    switch (type) {
      case 'FETCHING':
        return { ...state, status: 'FETCHING' }
      case 'SUCCESS':
        return { ...state, status: 'SUCCESS', details: response.data }
      case 'ERROR':
        return { ...state, status: 'ERROR', response }
      default:
        return state
    }
  }
  const [state, dispatch] = React.useReducer(reducer, { status: null, response: null })

  React.useEffect(() => {
    axios
      .get(`/service/tree/tf/person/CURRENT`)
      .then(response => dispatch({ type: 'SUCCESS', response }))
      .catch(response => dispatch({ type: 'ERROR', response }))
  }, [personId])

  return [state]
}

const UserCard = ({
  user,
  likeButtonPressedCount,
  logoColor,
  logoAnimationDuration,
  handleLogoAnimationDurationChange,
}) => {
  const dialogOpener = useOpener()
  const [{ portraitUrl }] = usePersonPortrait(user.personId)
  const [{ details }] = usePersonDetails(user.personId)
  const { personId, cisId, gender, displayName, contactName } = user

  return details ? (
    <Card>
      <CardHeader
        avatar={<Avatar src={portraitUrl} />}
        title={displayName}
        subheader={contactName}
      />
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <SocialLike />
            </ListItemIcon>
            <ListItemText primary={likeButtonPressedCount} secondary="Like Button Press Count" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ViewerContrastMore />
            </ListItemIcon>
            <ListItemText
              css={css`
                color: ${logoColor};
              `}
              primary={logoColor}
              secondary="Logo Color"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MediaFastForward />
            </ListItemIcon>
            <TextField
              id="logo-animation-duration"
              label="Animation Duration"
              value={logoAnimationDuration}
              onChange={e => handleLogoAnimationDurationChange(e.target.value)}
            />
          </ListItem>
        </List>

        <Dialog opener={dialogOpener} dismiss="Close" fullscreen>
          <DialogTitle>{details.fullName}</DialogTitle>
          <List dense>
            <ListItem>
              <ListItemText primary={personId} secondary="PID" />
            </ListItem>
            <ListItem>
              <ListItemText primary={cisId} secondary="CIS ID" />
            </ListItem>
            <ListItem>
              <ListItemText primary={gender} secondary="Gender" />
            </ListItem>
            <ListItem>
              <ListItemText primary={details.summary.lifespan} secondary="Lifespan" />
            </ListItem>
          </List>
        </Dialog>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={dialogOpener.open}>
          User Info
        </Button>
        <Button size="small" color="primary" href="/auth/familysearch/logout">
          Sign Out
        </Button>
      </CardActions>
    </Card>
  ) : null
}

export default UserCard
