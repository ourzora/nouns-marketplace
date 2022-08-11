import { useState } from 'react'
import { MDXComponents, DocsPageWrapper, HorizontalMenu } from 'components'
import {
  color,
  Button,
  Heading,
  Stack,
  Well,
  Box,
  Flex,
  Paragraph,
  Label,
  Eyebrow,
  Icon,
  MenuText,
  Text,
  Display,
  Spinner,
  SpinnerOG,
  InputField,
  Input,
  TextArea,
  Select,
  Switch,
  RadioButtonGroup,
  Checkbox,
  Accordion,
  Modal,
  ModalContent,
  PopUp,
  Slider,
  Tag,
} from '@zoralabs/zord'
import ZordMarkup from '../../docs/zordMarkup.md'

enum tabs {
  COMPONENTS = 'Components',
  MARKUP = 'Markup',
}

const menuItems = Object.values(tabs).map((item) => {
  return {
    id: item,
    label: item,
  }
})

export default function NounsAuctionHistory() {
  const [tab, setTab] = useState<string>(menuItems[0].id)

  return (
    <DocsPageWrapper title="Zord" width="100%" maxWidth="960px" useBackButton>
      <HorizontalMenu
        items={menuItems}
        setId={setTab}
        currentId={tab}
        position="sticky"
        pt="x2"
        top="x0"
        backgroundColor="primary"
        justify="flex-start"
        style={{
          borderBottom: `1px solid ${color.black10}`,
          zIndex: 100,
        }}
      />
      {tab === tabs.MARKUP && <ZordMarkup components={{ ...MDXComponents }} />}
      {tab === tabs.COMPONENTS && (
        <Flex direction="column" gap="x3">
          <Well style={{ gridColumn: '2/span 6' }} label="Colors">
            <Flex gap="x4">
              <Box w="x8" h="x8" backgroundColor="primary" />
              <Box w="x8" h="x8" backgroundColor="secondary" />
              <Box w="x8" h="x8" backgroundColor="tertiary" />
              <Box w="x8" h="x8" backgroundColor="reverse" />
              <Box w="x8" h="x8" backgroundColor="destructive" />
              <Box w="x8" h="x8" backgroundColor="success" />
              <Box w="x8" h="x8" backgroundColor="warning" />
            </Flex>
            <Flex gap="x4">
              <Box
                w="x8"
                h="x8"
                borderWidth="normal"
                borderStyle="solid"
                borderColor="primary"
              />
              <Box
                w="x8"
                h="x8"
                borderWidth="normal"
                borderStyle="solid"
                borderColor="secondary"
              />
              <Box
                w="x8"
                h="x8"
                borderWidth="normal"
                borderStyle="solid"
                borderColor="tertiary"
              />
              <Box
                w="x8"
                h="x8"
                borderWidth="normal"
                borderStyle="solid"
                borderColor="destructive"
              />
              <Box
                w="x8"
                h="x8"
                borderWidth="normal"
                borderStyle="solid"
                borderColor="success"
              />
              <Box
                w="x8"
                h="x8"
                borderWidth="normal"
                borderStyle="solid"
                borderColor="warning"
              />
            </Flex>
            <Flex gap="x4">
              <Box w="x8" h="x8" color="primary">
                xox
              </Box>
              <Box w="x8" h="x8" color="secondary">
                xox
              </Box>
              <Box w="x8" h="x8" color="tertiary">
                xox
              </Box>
              <Box w="x8" h="x8" color="destructive">
                xox
              </Box>
              <Box w="x8" h="x8" color="success">
                xox
              </Box>
              <Box w="x8" h="x8" color="warning">
                xox
              </Box>
              <Box w="x8" h="x8" color="reverse">
                xox
              </Box>
            </Flex>
          </Well>
          <Well style={{ gridColumn: '2/span 6' }} label="Typography">
            <Flex direction="column">
              <Eyebrow>Display</Eyebrow>
              <Display size="lg">Display lg</Display>
              <Display size="md">Display md</Display>
              <Display size="sm">Display sm</Display>
              <Display size="xs">Heading xs</Display>
            </Flex>

            <Flex direction="column">
              <Eyebrow>Headings</Eyebrow>
              <Heading size="xl">Heading xl</Heading>
              <Heading size="lg">Heading lg</Heading>
              <Heading size="md">Heading md</Heading>
              <Heading size="sm">Heading sm</Heading>
              <Heading size="xs">Heading xs</Heading>
            </Flex>
            <Flex direction="column">
              <Eyebrow>Labels</Eyebrow>
              <Label size="lg">Label lg</Label>
              <Label size="md">Label md</Label>
              <Label size="sm">Label sm</Label>
              <Label size="xs">Label xs</Label>
            </Flex>
            <Flex direction="column">
              <Eyebrow>Paragraphs</Eyebrow>
              <Paragraph size="lg">Paragraph lg</Paragraph>
              <Paragraph size="md">Paragraph md</Paragraph>
              <Paragraph size="sm">Paragraph sm</Paragraph>
              <Paragraph size="xs">Paragraph xs</Paragraph>
            </Flex>
            <Flex direction="column">
              <Eyebrow>MenuText</Eyebrow>
              <MenuText>MenuText</MenuText>
            </Flex>
            <Flex direction="column">
              <Eyebrow>Eyebrow</Eyebrow>
            </Flex>
            <Flex direction="column">
              <Eyebrow>Responsive Text</Eyebrow>
              <Text
                fontWeight="display"
                fontSize={{ '@initial': '48px', '@576': '65px' }}
              >
                Custom size which gets smaller at 576px breakpoint
              </Text>
            </Flex>
          </Well>
          <Well style={{ gridColumn: '2/span 10' }} label="Inputs">
            <Flex align="end" gap="x2">
              <Flex direction="column" align="end">
                <InputField
                  name="lowProfile"
                  lowProfile
                  placeholder="LowProfile + AutoFocus"
                  className="inputLowProfile"
                />
              </Flex>
            </Flex>
          </Well>

          <Well style={{ gridColumn: '8/span 4' }} label="Icons">
            <Flex gap="x4">
              <Box>
                <Eyebrow>Small</Eyebrow>
                <Icon size="sm" id="Bell" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Large</Eyebrow>
                <Icon size="lg" id="Bell" p="x3" />
              </Box>
              {/*
              <Box>
                <Eyebrow>Flipped</Eyebrow>
                <Icon size="lg" flip id="Bell" p="x3" />
                    </Box>
                    */}
            </Flex>
            <Flex gap="x4" wrap="wrap" w="100%">
              <Box>
                <Eyebrow>ArrowRight</Eyebrow>
                <Icon size="lg" id="ArrowRight" p="x3" />
              </Box>
              <Box>
                <Eyebrow>ArrowRightAngle</Eyebrow>
                <Icon size="lg" id="ArrowRightAngle" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Auction</Eyebrow>
                <Icon size="lg" id="Auction" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Bell</Eyebrow>
                <Icon size="lg" id="Bell" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Check</Eyebrow>
                <Icon size="lg" id="Check" p="x3" />
              </Box>
              <Box>
                <Eyebrow>ChevronDown</Eyebrow>
                <Icon size="lg" id="ChevronDown" p="x3" />
              </Box>
              <Box>
                <Eyebrow>ChevronLeft</Eyebrow>
                <Icon size="lg" id="ChevronLeft" p="x3" />
              </Box>
              <Box>
                <Eyebrow>ChevronRight</Eyebrow>
                <Icon size="lg" id="ChevronRight" p="x3" />
              </Box>
              <Box>
                <Eyebrow>ChevronUp</Eyebrow>
                <Icon size="lg" id="ChevronUp" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Close</Eyebrow>
                <Icon size="lg" id="Close" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Coinbase</Eyebrow>
                <Icon size="lg" id="Coinbase" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Copy</Eyebrow>
                <Icon size="lg" id="Copy" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Create</Eyebrow>
                <Icon size="lg" id="Create" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Discord</Eyebrow>
                <Icon size="lg" id="Discord" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Download</Eyebrow>
                <Icon size="lg" id="Download" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Ellipsis</Eyebrow>
                <Icon size="lg" id="Ellipsis" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Embed</Eyebrow>
                <Icon size="lg" id="Embed" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Instagram</Eyebrow>
                <Icon size="lg" id="Instagram" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Kebab</Eyebrow>
                <Icon size="lg" id="Kebab" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Logout</Eyebrow>
                <Icon size="lg" id="Logout" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Metamask</Eyebrow>
                <Icon size="lg" id="Metamask" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Pencil</Eyebrow>
                <Icon size="lg" id="Pencil" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Plus</Eyebrow>
                <Icon size="lg" id="Plus" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Question</Eyebrow>
                <Icon size="lg" id="Question" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Rainbow</Eyebrow>
                <Icon size="lg" id="Rainbow" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Search</Eyebrow>
                <Icon size="lg" id="Search" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Shield</Eyebrow>
                <Icon size="lg" id="Shield" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Spinner</Eyebrow>
                <Icon size="lg" id="Spinner" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Tag</Eyebrow>
                <Icon size="lg" id="Tag" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Twitter</Eyebrow>
                <Icon size="lg" id="Twitter" p="x3" />
              </Box>
              <Box>
                <Eyebrow>WalletConnect</Eyebrow>
                <Icon size="lg" id="WalletConnect" p="x3" />
              </Box>
              <Box>
                <Eyebrow>Warning</Eyebrow>
                <Icon size="lg" id="Warning" p="x3" />
              </Box>
            </Flex>
          </Well>

          <Well style={{ gridColumn: '2/span 10' }} label="Buttons">
            <Eyebrow>Primary</Eyebrow>
            <Flex align="center" gap="x2">
              <Button variant="primary" icon="Bell">
                Button
              </Button>
              <Button variant="primary" size="md">
                Button
              </Button>
              <Button variant="primary" size="sm">
                Button
              </Button>
              <Button variant="primary" loading>
                Button
              </Button>
              <Button variant="primary" disabled>
                Button
              </Button>
            </Flex>
            <Eyebrow>Secondary</Eyebrow>
            <Flex align="center" gap="x2">
              <Button variant="secondary" icon="Bell">
                Button
              </Button>
              <Button variant="secondary" size="md">
                Button
              </Button>
              <Button variant="secondary" size="sm">
                Button
              </Button>
              <Button variant="secondary" loading>
                Button
              </Button>
              <Button variant="secondary" disabled>
                Button
              </Button>
            </Flex>
            <Eyebrow>Outline</Eyebrow>
            <Flex align="center" gap="x2">
              <Button variant="outline" icon="Bell">
                Button
              </Button>
              <Button variant="outline" size="md">
                Button
              </Button>
              <Button variant="outline" size="sm">
                Button
              </Button>
              <Button variant="outline" loading>
                Button
              </Button>
              <Button variant="outline" disabled>
                Button
              </Button>
            </Flex>

            <Eyebrow>Circle</Eyebrow>
            <Flex align="center" gap="x2">
              <Button variant="circle" size="md">
                +
              </Button>
              <Button variant="circle" size="sm">
                +
              </Button>
              <Button variant="circle" loading>
                +
              </Button>
              <Button variant="circle" disabled>
                +
              </Button>
            </Flex>

            <Eyebrow>Ghost</Eyebrow>
            <Flex align="center" gap="x2">
              <Button variant="ghost" size="md">
                Button
              </Button>
              <Button variant="ghost" size="sm">
                Button
              </Button>
              <Button variant="ghost" loading>
                Button
              </Button>
              <Button variant="ghost" disabled>
                Button
              </Button>
            </Flex>

            <Eyebrow>Pill Primary</Eyebrow>
            <Flex align="center" gap="x2">
              <Button pill variant="primary" size="md">
                Button
              </Button>
              <Button pill variant="primary" size="sm">
                Button
              </Button>
              <Button pill variant="primary" loading>
                Button
              </Button>
              <Button pill variant="primary" disabled>
                Button
              </Button>
            </Flex>

            <Eyebrow>Pill Outline</Eyebrow>
            <Flex align="center" gap="x2">
              <Button pill variant="outline" size="md">
                Button
              </Button>
              <Button pill variant="outline" size="sm">
                Button
              </Button>
              <Button pill variant="outline" loading>
                Button
              </Button>
              <Button pill variant="outline" disabled>
                Button
              </Button>
            </Flex>
            <Eyebrow>Inherit currentColor</Eyebrow>
            <Flex align="center">
              <Button icon="Bell" style={{ color: '#9999ff' }}>
                Button
              </Button>
            </Flex>
          </Well>
          <Well style={{ gridColumn: '2/span 10' }} label="Spinner">
            <Spinner />
            <Eyebrow>Size: md</Eyebrow>
            <Spinner size="md" />
            <Eyebrow>Size: lg</Eyebrow>
            <Spinner size="lg" />
          </Well>
          <Well style={{ gridColumn: '2/span 10' }} label="SpinnerOG">
            <SpinnerOG />
            <Eyebrow>Size: 20</Eyebrow>
            <SpinnerOG size={20} />
            <Eyebrow>Size: 50</Eyebrow>
            <SpinnerOG size={50} />
          </Well>

          <Well style={{ gridColumn: '2/span 10' }} label="Inputs">
            <Flex align="end" gap="x2">
              <Flex direction="column">
                <Eyebrow>Base Input</Eyebrow>
                <Input
                  name="basic"
                  size="lg"
                  placeholder="Basic Input"
                  className="basicinput"
                />
              </Flex>
            </Flex>
            <Flex align="end" gap="x2">
              <Flex direction="column">
                <InputField
                  name="basic"
                  placeholder="InputField + Label"
                  label="Input w/ Label"
                  className="basicinput"
                />
              </Flex>
              <Flex direction="column" align="end">
                <InputField
                  name="nolabel"
                  placeholder="No Label"
                  className="inputnolabel"
                />
              </Flex>
              <Flex direction="column">
                <InputField
                  name="basic"
                  placeholder="Disabled"
                  label="Disabled"
                  className="disabledinput"
                  disabled
                />
              </Flex>
              <Flex direction="column">
                <InputField
                  name="icon"
                  placeholder="With Icon"
                  label="With Icon"
                  className="iconinput"
                  icon="Search"
                />
              </Flex>
            </Flex>
            <Flex gap="x2">
              <Flex direction="column">
                <InputField
                  name="basic"
                  placeholder="InputField + Error"
                  label="Input w/ Error"
                  className="basicinput"
                  error="Oh no it's an error"
                />
              </Flex>
              <Flex direction="column">
                <InputField
                  name="basic"
                  placeholder="InputField + Desc"
                  label="Input w/ Desc"
                  className="basicinput"
                  description="Oh wow it's a description"
                />
              </Flex>
              <Flex direction="column">
                <InputField
                  name="affix"
                  placeholder="With affix"
                  label="With affix"
                  className="iconaffix"
                  affix=".eth"
                />
              </Flex>
              <Flex direction="column">
                <InputField
                  name="number"
                  placeholder="Number"
                  label="Number"
                  type="number"
                  className="number"
                  min={0}
                  step={0.5}
                  max={10}
                />
              </Flex>
            </Flex>
            <Flex gap="x2">
              <Flex direction="column">
                <TextArea
                  name="basic"
                  placeholder="TextArea"
                  label="TextArea"
                  className="basicinput"
                  description="This is the textarea description"
                />
              </Flex>
              <Flex direction="column">
                <TextArea
                  name="basic"
                  placeholder="TextArea"
                  label="TextArea w/ Error"
                  className="basicinput"
                  error="Oh no something bad happened"
                  description="This is another textarea description"
                />
              </Flex>
            </Flex>
          </Well>

          <Well style={{ gridColumn: '2/span 10' }} label="Select">
            <Stack gap="x3">
              <Flex direction="column">
                <Eyebrow>Select</Eyebrow>
                <Box p="x2">
                  <Select defaultValue="2">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </Select>
                </Box>
              </Flex>
              {/*
                    <Flex direction="column">
                <Eyebrow>Select: size md</Eyebrow>
                <Box p="x2">
                  <Select defaultValue="2" size="md">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </Select>
                </Box>
                    </Flex>
                    */}
              <Flex direction="column">
                <Eyebrow>Select: size lg</Eyebrow>
                <Box p="x2">
                  <Select defaultValue="2" size="lg">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </Select>
                </Box>
              </Flex>
            </Stack>
          </Well>
          <Well style={{ gridColumn: '2/span 10' }} label="Switch">
            <Stack gap="x3">
              <Flex direction="column">
                <Box p="x2">
                  <Switch />
                </Box>
              </Flex>
            </Stack>
          </Well>
          <Well style={{ gridColumn: '2/span 10' }} label="Collection Filters">
            <Flex direction="row" gap="x3">
              <Flex direction="column">
                <Eyebrow>RadioButtonGroup (DS version)</Eyebrow>
                <Box p="x2">
                  <RadioButtonGroup
                    items={[
                      { label: 'Default', value: '1-default' },
                      { label: 'Compact', value: '2-compact' },
                      { label: 'Comfortable', value: '3-comfortable' },
                      { value: '4-nolabel' },
                      { label: 'Disabled', value: '5-disabled', disabled: true },
                    ]}
                    name="zord-test-checkbox"
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex direction="row" gap="x3">
              <Flex direction="column">
                <Eyebrow>Checkbox</Eyebrow>
                <Box p="x2">
                  <Checkbox
                    defaultChecked
                    id="zord-test-checkbox"
                    name="zord-test-checkbox"
                  />
                </Box>
              </Flex>
              <Flex direction="column">
                <Eyebrow>With Label</Eyebrow>
                <Checkbox
                  id="checkbox_label"
                  label="Checkbox label"
                  name="Base Checkbox"
                />
              </Flex>
              <Flex direction="column">
                <Eyebrow>Disabled Checked</Eyebrow>
                <Checkbox
                  id="checkbox_disabled"
                  disabled
                  checked
                  name="Disabled Checkbox"
                  label="Disabled Checkbox"
                />
              </Flex>
              <Flex direction="column">
                <Eyebrow>Disabled Unchecked</Eyebrow>
                <Checkbox
                  id="checkbox_disabledunchecked"
                  disabled
                  name="Disabled Unchecked"
                  label="Disabled Unchecked"
                />
              </Flex>
            </Flex>
            <Flex direction="row">
              <Flex direction="column">
                <Eyebrow>Filter Accordion (Preview)</Eyebrow>
                <Accordion
                  label="This is the label"
                  enableDeselectAll
                  defaultState="open"
                  onDeselectAll={(e) => {
                    e.stopPropagation()
                    alert('deselect all')
                  }}
                  style={{ width: '325px' }}
                >
                  <Flex direction="column" align="stretch" gap="x4" pt="x4">
                    <InputField
                      name="Search Input"
                      placeholder="Search Collections..."
                      className="searchinput"
                      icon="Search"
                    />
                  </Flex>
                </Accordion>
              </Flex>
            </Flex>
          </Well>
          <Well style={{ gridColumn: '2/span 6' }} label="Slider">
            <Flex direction="column" gap="x4">
              <Slider
                defaultValue={[1]}
                min={1}
                max={10}
                step={1}
                unitName="day"
                unitNamePlural="days"
                showInlineUnits
                showLabel
              />
            </Flex>
          </Well>
          <Well style={{ gridColumn: '2/span 6' }} label="Buttons in Forms">
            <form
              onSubmit={() => {
                alert('submitted')
                return false
              }}
            >
              <Flex direction="column" gap="x4">
                <Button type="button">This should not submit the form</Button>
                <Button type="submit">This should submit the form</Button>
              </Flex>
            </form>
          </Well>
          <Well style={{ gridColumn: '2/span 10' }} label="Tag">
            <Stack gap="x3">
              <Flex direction="column">
                <Eyebrow>Default tag</Eyebrow>
                <Box p="x2">
                  <Tag>Tag value</Tag>
                </Box>
              </Flex>
              <Flex direction="column">
                <Eyebrow>Active tag</Eyebrow>
                <Box p="x2">
                  <Tag active={true}>Tag value</Tag>
                </Box>
              </Flex>
              <Flex direction="column">
                <Eyebrow>Inactive tag</Eyebrow>
                <Box p="x2">
                  <Tag inactive={true}>Tag value</Tag>
                </Box>
              </Flex>
              <Flex direction="column">
                <Eyebrow>Tag w/ dot</Eyebrow>
                <Box p="x2">
                  <Tag showDot={true}>Tag value</Tag>
                </Box>
              </Flex>
            </Stack>
          </Well>
          <Well style={{ gridColumn: '8/span 4' }} label="PopUps">
            <Stack gap="x2">
              <Eyebrow>PopUp</Eyebrow>
              <PopUp>
                <Box>
                  <Label>PopUp Heading</Label>
                  <Paragraph>PopUp Ipsum Dolor sit etc.</Paragraph>
                </Box>
              </PopUp>
            </Stack>
            <Stack gap="x2">
              <Eyebrow>PopUp with Custom Trigger</Eyebrow>
              <PopUp trigger={<Button>Open PopUp</Button>}>
                <Box>
                  <Label>PopUp Heading</Label>
                  <Paragraph>PopUp Ipsum Dolor sit etc.</Paragraph>
                </Box>
              </PopUp>
            </Stack>
          </Well>
          <Well style={{ gridColumn: '8/span 4' }} label="Example GridCol 8/span 4">
            <Text>test 2</Text>
            <Modal trigger={<Button>Open modal</Button>}>
              <ModalContent title="This is a modal">
                <Paragraph>This is a Modal</Paragraph>
              </ModalContent>
            </Modal>
          </Well>
        </Flex>
      )}
    </DocsPageWrapper>
  )
}
