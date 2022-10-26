import { Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(false)
  const orm = brzycki(parseFloat(weight), parseFloat(reps))
  return (
    <Stack sx={{ padding: '2em' }} direction='column'>
      <Stack direction='row' spacing={2}>
        <TextField
          error={error}
          label='Weight'
          variant='outlined'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          error={error}
          label='Repetetions'
          variant='outlined'
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </Stack>
      {orm ? <Table orm={orm} /> : null}
    </Stack>
  )
}

function Table(props: { orm: number }) {
  const orm = props.orm
  const repRange = [1, 20]
  const rows = []
  for (let i = repRange[0]; i <= repRange[1]; i++) {
    rows.push(<Row orm={orm} reps={i} />);
  }
  return (
    <Grid container sx={{ padding: '1em' }}>
      <Grid item xs={4}>
        Reps
      </Grid>
      <Grid item xs={4}>
        Weight
      </Grid>
      <Grid item xs={4}>
        % of Max
      </Grid>
      {rows}
    </Grid>
  )
}

function Row(props: { orm: number, reps: number }) {
  const orm = props.orm
  const reps = props.reps
  const weight = Math.round(maxWeight(orm, reps))
  const percentORM = Math.round(maxWeight(orm, reps) / orm * 100)
  return (
    <>
      <Grid item xs={12}>
        <hr />
      </Grid>
      <Grid item xs={4}>
        <Typography>{reps}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{weight}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{percentORM}</Typography>
      </Grid>
    </>
  )
}

// see: https://www.vcalc.com/wiki/Caroline4/Brzycki
// returns a one-rep max 
export function brzycki(weight: number, reps: number): number {
  return weight * (36 / (37 - reps));
}

// returns max weight
export function maxWeight(max: number, reps: number) {
  return max / (36 / (37 - reps));
}

// returns max reps
export function maxReps(max: number, weight: number) {
  return -(36 * weight / max) + 37
}