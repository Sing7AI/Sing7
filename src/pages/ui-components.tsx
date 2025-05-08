import React from 'react';
import { 
  Alert, 
  Button, 
  Card, 
  Input, 
  Grid, 
  Typography, 
  H1, 
  H2, 
  H3, 
  H4, 
  Body1, 
  Body2 
} from '../components/ui';

const UIComponentsPage = () => {
  return (
    <div className="ui-components-page">
      <div className="container">
        <H1 align="center" gutterBottom>Sing7 UI Components</H1>
        <Body1 align="center" gutterBottom>
          A showcase of reusable UI components for the Sing7 application
        </Body1>

        <section className="component-section">
          <H2 gutterBottom>Typography</H2>
          <Card padding="large">
            <Grid.Container spacing={4}>
              <Grid.Item xs={12}>
                <H1>Heading 1</H1>
                <H2>Heading 2</H2>
                <H3>Heading 3</H3>
                <H4>Heading 4</H4>
                <Typography variant="h5">Heading 5</Typography>
                <Typography variant="h6">Heading 6</Typography>
              </Grid.Item>
              <Grid.Item xs={12} md={6}>
                <Typography variant="subtitle1">Subtitle 1 - A bit larger subtitle</Typography>
                <Typography variant="subtitle2">Subtitle 2 - A smaller subtitle</Typography>
              </Grid.Item>
              <Grid.Item xs={12} md={6}>
                <Body1>Body 1 - Standard body text used for most content</Body1>
                <Body2>Body 2 - Smaller body text usually used for secondary content</Body2>
                <Typography variant="caption">Caption - Very small text for captions and footnotes</Typography>
                <br />
                <Typography variant="overline">OVERLINE - ALL CAPS SMALL TEXT</Typography>
              </Grid.Item>
            </Grid.Container>
          </Card>
        </section>

        <section className="component-section">
          <H2 gutterBottom>Buttons</H2>
          <Card padding="large">
            <H3 gutterBottom>Variants</H3>
            <Grid.Container spacing={2}>
              <Grid.Item xs={12} sm={6} md={3}>
                <Button variant="primary">Primary</Button>
              </Grid.Item>
              <Grid.Item xs={12} sm={6} md={3}>
                <Button variant="secondary">Secondary</Button>
              </Grid.Item>
              <Grid.Item xs={12} sm={6} md={3}>
                <Button variant="outline">Outline</Button>
              </Grid.Item>
              <Grid.Item xs={12} sm={6} md={3}>
                <Button variant="text">Text</Button>
              </Grid.Item>
            </Grid.Container>

            <H3 gutterBottom style={{ marginTop: '2rem' }}>Sizes</H3>
            <Grid.Container spacing={2} alignItems="center">
              <Grid.Item xs={12} sm={4}>
                <Button size="small">Small</Button>
              </Grid.Item>
              <Grid.Item xs={12} sm={4}>
                <Button size="medium">Medium</Button>
              </Grid.Item>
              <Grid.Item xs={12} sm={4}>
                <Button size="large">Large</Button>
              </Grid.Item>
            </Grid.Container>

            <H3 gutterBottom style={{ marginTop: '2rem' }}>States</H3>
            <Grid.Container spacing={2}>
              <Grid.Item xs={12} sm={4}>
                <Button>Normal</Button>
              </Grid.Item>
              <Grid.Item xs={12} sm={4}>
                <Button disabled>Disabled</Button>
              </Grid.Item>
              <Grid.Item xs={12} sm={4}>
                <Button fullWidth>Full Width</Button>
              </Grid.Item>
            </Grid.Container>

            <H3 gutterBottom style={{ marginTop: '2rem' }}>Link Buttons</H3>
            <Grid.Container spacing={2}>
              <Grid.Item xs={12} sm={6}>
                <Button href="/brand">Internal Link</Button>
              </Grid.Item>
              <Grid.Item xs={12} sm={6}>
                <Button href="https://example.com" target="_blank" rel="noopener">External Link</Button>
              </Grid.Item>
            </Grid.Container>
          </Card>
        </section>

        <section className="component-section">
          <H2 gutterBottom>Cards</H2>
          <Grid.Container spacing={4}>
            <Grid.Item xs={12} sm={6} md={4}>
              <Card>
                <H3 gutterBottom>Basic Card</H3>
                <Body1>This is a basic card with default padding.</Body1>
              </Card>
            </Grid.Item>
            <Grid.Item xs={12} sm={6} md={4}>
              <Card elevation="high" padding="large">
                <H3 gutterBottom>Elevated Card</H3>
                <Body1>This card has high elevation and large padding.</Body1>
              </Card>
            </Grid.Item>
            <Grid.Item xs={12} sm={6} md={4}>
              <Card elevation="flat" border>
                <H3 gutterBottom>Flat Card with Border</H3>
                <Body1>This card is flat with a border.</Body1>
              </Card>
            </Grid.Item>
            <Grid.Item xs={12}>
              <Card padding="small" onClick={() => alert('Card clicked!')}>
                <H3 gutterBottom>Clickable Card</H3>
                <Body1>This card is clickable. Try it!</Body1>
              </Card>
            </Grid.Item>
          </Grid.Container>
        </section>

        <section className="component-section">
          <H2 gutterBottom>Alerts</H2>
          <Grid.Container spacing={3}>
            <Grid.Item xs={12}>
              <Alert severity="info" title="Information">
                This is an informational alert. It provides general information.
              </Alert>
            </Grid.Item>
            <Grid.Item xs={12}>
              <Alert severity="success" title="Success">
                This is a success alert. Action completed successfully!
              </Alert>
            </Grid.Item>
            <Grid.Item xs={12}>
              <Alert severity="warning" title="Warning">
                This is a warning alert. Be careful about this action.
              </Alert>
            </Grid.Item>
            <Grid.Item xs={12}>
              <Alert severity="error" title="Error">
                This is an error alert. Something went wrong!
              </Alert>
            </Grid.Item>
            <Grid.Item xs={12} md={6}>
              <Alert severity="info" variant="outlined">
                Outlined variant without title
              </Alert>
            </Grid.Item>
            <Grid.Item xs={12} md={6}>
              <Alert severity="success" variant="filled">
                Filled variant without title
              </Alert>
            </Grid.Item>
          </Grid.Container>
        </section>

        <section className="component-section">
          <H2 gutterBottom>Inputs</H2>
          <Card padding="large">
            <Grid.Container spacing={4}>
              <Grid.Item xs={12} md={6}>
                <Input label="Standard Input" placeholder="Enter text here" />
              </Grid.Item>
              <Grid.Item xs={12} md={6}>
                <Input label="With Error" placeholder="Enter text here" error="This field is required" />
              </Grid.Item>
              <Grid.Item xs={12} md={6}>
                <Input label="Disabled Input" placeholder="You can't edit this" disabled />
              </Grid.Item>
              <Grid.Item xs={12} md={6}>
                <Input label="Password Input" type="password" placeholder="Enter password" />
              </Grid.Item>
              <Grid.Item xs={12}>
                <Input label="Full Width Input" placeholder="This input takes up the full width" fullWidth />
              </Grid.Item>
            </Grid.Container>
          </Card>
        </section>

        <section className="component-section">
          <H2 gutterBottom>Grid Layout</H2>
          <Card padding="large">
            <H3 gutterBottom>Responsive Grid</H3>
            <Grid.Container spacing={2}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
                <Grid.Item key={item} xs={12} sm={6} md={4} lg={3}>
                  <div style={{ 
                    background: '#57b9f8', 
                    color: 'white', 
                    padding: '1rem', 
                    textAlign: 'center',
                    borderRadius: '4px'
                  }}>
                    Item {item}
                  </div>
                </Grid.Item>
              ))}
            </Grid.Container>

            <H3 gutterBottom style={{ marginTop: '2rem' }}>Different Column Sizes</H3>
            <Grid.Container spacing={2}>
              <Grid.Item xs={12} md={6}>
                <div style={{ 
                  background: '#57b9f8', 
                  color: 'white', 
                  padding: '1rem', 
                  textAlign: 'center',
                  borderRadius: '4px'
                }}>
                  6 Columns
                </div>
              </Grid.Item>
              <Grid.Item xs={12} md={3}>
                <div style={{ 
                  background: '#3a9fe7', 
                  color: 'white', 
                  padding: '1rem', 
                  textAlign: 'center',
                  borderRadius: '4px'
                }}>
                  3 Columns
                </div>
              </Grid.Item>
              <Grid.Item xs={12} md={3}>
                <div style={{ 
                  background: '#3a9fe7', 
                  color: 'white', 
                  padding: '1rem', 
                  textAlign: 'center',
                  borderRadius: '4px'
                }}>
                  3 Columns
                </div>
              </Grid.Item>
              <Grid.Item xs={12} md={4}>
                <div style={{ 
                  background: '#1c87d6', 
                  color: 'white', 
                  padding: '1rem', 
                  textAlign: 'center',
                  borderRadius: '4px'
                }}>
                  4 Columns
                </div>
              </Grid.Item>
              <Grid.Item xs={12} md={8}>
                <div style={{ 
                  background: '#1c87d6', 
                  color: 'white', 
                  padding: '1rem', 
                  textAlign: 'center',
                  borderRadius: '4px'
                }}>
                  8 Columns
                </div>
              </Grid.Item>
            </Grid.Container>
          </Card>
        </section>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .component-section {
          margin-top: 4rem;
          margin-bottom: 4rem;
        }
      `}</style>
    </div>
  );
};

export default UIComponentsPage; 