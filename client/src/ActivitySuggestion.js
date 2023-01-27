import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import {Divider, Stack} from "@mui/joy";
import CategoryIcon from '@mui/icons-material/Category';

export default function ActivitySuggestion() {
	return (
		<Card variant="outlined" sx={{ width: 640 }}>
			<Stack direction="column" alignItems="flex-start" sx={{ p: 1 }} spacing={1}>
				<Typography level="h2" fontSize="md">
					Surprise your significant other with something considerate
				</Typography>
				<Typography level="body2"><CategoryIcon sx={{ mr: 1 }} />social</Typography>
			</Stack>
			<IconButton
				aria-label="refresh"
				variant="plain"
				color="neutral"
				size="sm"
				sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
			>
				<RefreshIcon />
			</IconButton>
			<AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
				<img
					src="https://source.unsplash.com/random?social"
					loading="lazy"
					alt=""
				/>
			</AspectRatio>
			<Stack sx={{ p: 2 }} direction="row">
				<Stack direction="row" divider={<Divider orientation="vertical" />} spacing={2}>
					<div>
						<Typography level="body3">Price:</Typography>
						<Typography fontSize="lg" fontWeight="lg">Free</Typography>
					</div>
					<div>
						<Typography level="body3">Accessibility:</Typography>
						<Typography fontSize="lg" fontWeight="lg">High</Typography>
					</div>
					<div>
						<Typography level="body3">Participants:</Typography>
						<Typography fontSize="lg" fontWeight="lg">1</Typography>
					</div>
				</Stack>
				<Button
					variant="solid"
					size="sm"
					color="primary"
					aria-label="Explore Bahamas Islands"
					sx={{ ml: 'auto', fontWeight: 600 }}
				>
					Explore
				</Button>
			</Stack>
		</Card>
	);
}
